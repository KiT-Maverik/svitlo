import { createHash } from 'node:crypto';

import { lesson_Config_Schema } from '../../../configurators/lessons/defineLesson/defineLesson.schemas';
import { lessonProductionAssessmentRequirements_Schema } from '../../../types/workflow/lessonAssessment.types';
import {
  lessonWorkflowSection_Schema,
  lessonWorkflowStage2_Schema,
  type LessonWorkflowStage2,
  type LessonWorkflowStage2Section,
} from '../../../types/workflow/lessonWorkflow.types';
import { workflowLanguages_Schema } from '../../../types/workflow/workflowLanguages.schemas';
import { materializeAudio } from '../audio/materializeAudio';
import { materializeCarousel } from '../carousel/materializeCarousel';
import { materializeCheckpoint } from '../checkpoint/materializeCheckpoint';
import { materializeCheckpointAnswer } from '../checkpointAnswer/materializeCheckpointAnswer';
import { materializeCheckpointItem } from '../checkpointItem/materializeCheckpointItem';
import { materializeCode } from '../code/materializeCode';
import { materializeCodingTaskSection } from '../codingTaskSection/codingTaskSection';
import { materializeContentSection } from '../contentSection/contentSection';
import { materializeFlashcardsSection } from '../flashcardsSection/flashcardsSection';
import { materializeImage } from '../image/materializeImage';
import { materializeLearningFlowSection } from '../learningFlowSection/learningFlowSection';
import { materializeMarkdown } from '../markdown/materializeMarkdown';
import { materializePracticeSection } from '../practiceSection/practiceSection';
import { materializeQuestSection } from '../questSection/questSection';
import { materializeQuestStage } from '../questStage/questStage';
import { materializeQuestTask } from '../questTask/questTask';
import { materializeQuizSection } from '../quizSection/quizSection';
import { materializeScene, renderSceneFiles } from '../scene/materializeScene';
import { materializeSubtitles } from '../subtitles/materializeSubtitles';
import { materializeText } from '../text/materializeText';
import { materializeVideo } from '../video/materializeVideo';
import { materializeYoutube } from '../youtube/materializeYoutube';
import { assertLessonSourceReleaseReady, materializeLesson, type ChildConfig, type Result } from './lesson';
import {
  preserveAssessmentReferences,
  reviewedSkillReferences,
  type TrustedBankSelection,
} from './preserveAssessmentReferences';

/** Pinned source metadata for a trusted caller; editorial state is not input. */
export type LessonStage6Source = {
  sourcePath: string;
  sourceBlobSha: string;
  sourceCommitSha: string;
};
export type LessonStage6Options = {
  /** Exact draft.ts blob, not regenerated TypeScript. */
  sourceText: string;
  source: LessonStage6Source;
  /** Verify that the inert parsed object and exact bytes came from the pinned source. */
  verifySourceInput: (
    input: Readonly<LessonWorkflowStage2>,
    source: Readonly<LessonStage6Source>,
    sourceText: string,
  ) => boolean;
  /** Per-Skill attestation from the runner's authorized immutable taxonomy. */
  trustedSkillReferences?: readonly (Readonly<{
    approved: true;
    id: string;
    path: string;
    exported: string;
    sourceSha: string;
  }> | null)[];
  /** Per-selected UUID bank references approved independently of draft syntax. */
  trustedBankSelections?: readonly TrustedBankSelection[];
};
export type LessonStage6Plan = {
  lessonId: string;
  sourcePath: string;
  materializedPath: string;
  sourceBlobSha: string;
  sourceCommitSha: string;
  publishable: false;
  files: Result['files'];
  diagnostics: Result['diagnostics'];
};

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const sha = /^[0-9a-f]{40}$/i;
const safeSlug = /^[A-Za-z][A-Za-z0-9]*$/;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
type Node = { config: Record<string, unknown>; production?: Record<string, unknown> };
type RenderOptions = {
  directory: string;
  documentLanguage: string;
  languagesImport: string;
  production?: Record<string, unknown>;
  /** A Course placement preserves Section notes in its own override footer. */
  noteOwnership?: 'course-lesson-placement';
};

function gitBlobSha(source: string): string {
  return createHash('sha1')
    .update('blob ' + Buffer.byteLength(source, 'utf8') + '\0')
    .update(source, 'utf8')
    .digest('hex');
}
/** Preserve owner-rooted Lesson/Episode aliases through recursive children.
 * For old relative imports, resolve only the additional directory depth;
 * never assume a Lesson root when rendering an Episode subtree. */
function childLanguagesImport(parent: RenderOptions, childDirectory: string): string {
  const from = parent.languagesImport;
  if (from.startsWith('#') || from.startsWith('@')) return from;
  if (!/^(?:\.\.?\/)/.test(from)) throw new Error('Unsafe inherited languages import: ' + from);
  const delta = childDirectory.split('/').length - parent.directory.split('/').length;
  if (delta < 0) throw new Error('Child languages import escaped parent directory');
  return '../'.repeat(delta) + from.replace(/^\.\//, '');
}
function node(value: unknown, at: string): Node {
  if (!isRecord(value) || !isRecord(value.config) || (!isRecord(value.production) && value.production !== undefined))
    throw new Error(at + ': expected a plain { config, production? } Stage 2 node');
  const config = value.config as Record<string, unknown>;
  if (
    typeof config.type !== 'string' ||
    typeof config.slug !== 'string' ||
    !safeSlug.test(config.slug) ||
    typeof config.id !== 'string' ||
    !uuid.test(config.id)
  )
    throw new Error(at + ': invalid authored entity identity');
  return { config, ...(isRecord(value.production) ? { production: value.production } : {}) };
}

/** Convert only the already-authored nested child envelopes into Config shapes.
 * Every original node's production remains attached to its stable UUID.
 * Never create a Section, Block, media value, Question or Flashcard ID.
 */
function createStage2Normalizer(initialIds: readonly string[]) {
  const metadata = new Map<string, Record<string, unknown>>();
  const scenes: { id: string; slug: string; specification?: string }[] = [];
  const seen = new Set<string>(initialIds);
  const ordered = (value: unknown, location: string, wrapped: boolean) => {
    if (!isRecord(value) || !Array.isArray(value.children) ||
        Object.hasOwn(value, 'content') || Object.hasOwn(value, 'section') || Object.hasOwn(value, 'slides'))
      throw new Error(location + ': expected direct root children');
    const own = new Set(['id', 'type', 'slug', 'params', 'locale', 'skills', 'events', 'draft', 'children']);
    const collection = Object.fromEntries(Object.entries(value).filter(([key]) => !own.has(key)));
    const keys = Object.keys(collection);
    if (keys.length !== value.children.length ||
        new Set(value.children).size !== keys.length ||
        value.children.some(key => typeof key !== 'string' || !Object.hasOwn(collection, key)))
      throw new Error(location + '.children: every authored child must be ordered once');
    const items: Record<string, unknown> = {};
    for (const key of keys) {
      if (!safeSlug.test(key) || ['constructor', 'prototype', '__proto__'].includes(key))
        throw new Error(location + ': unsafe child key ' + key);
      const raw = node(collection[key], location + '.' + key);
      if (raw.config.slug !== key) throw new Error(location + '.' + key + ': child slug mismatch');
      const child = unwrap(collection[key], location + '.' + key);
      items[key] = wrapped ? { config: child, ...(raw.production ? { production: raw.production } : {}) } : child;
    }
    return { children: [...value.children], ...items };
  };

  function unwrap(value: unknown, at: string): Record<string, unknown> {
    const current = node(value, at);
    const config = current.config;
    const id = config.id as string;
    if (seen.has(id)) throw new Error(at + ': duplicate authored UUID ' + id);
    seen.add(id);
    if (current.production) metadata.set(id, current.production);
    const normalized: Record<string, unknown> = { ...config };
    const typ = config.type;
    if (typ === 'scene')
      scenes.push({
        id,
        slug: config.slug as string,
        specification:
          typeof current.production?.specification === 'string' ? current.production.specification : undefined,
      });

    if (['content', 'practice', 'codingTask', 'learningFlow', 'quiz', 'flashcards'].includes(typ as string))
      Object.assign(normalized, ordered(config, at, true));
    else if (typ === 'carousel') Object.assign(normalized, ordered(config, at, false));
    else if (typ === 'checkpoint') Object.assign(normalized, ordered(config, at, false));
    else if (typ === 'checkpointItem') {
      normalized.question = unwrap(config.question, at + '.question');
      normalized.answer = unwrap(config.answer, at + '.answer');
    } else if (typ === 'checkpointAnswer') Object.assign(normalized, ordered(config, at, false));
    else if (typ === 'quest') {
      for (const group of ['stages', 'tasks'] as const) {
        if (!isRecord(config[group]) || !Object.hasOwn(config[group], 'start'))
          throw new Error(at + '.' + group + ': mandatory start node is missing');
        const raw = config[group] as Record<string, unknown>;
        normalized[group] = Object.fromEntries(
          Object.entries(raw).map(([key, value]) => {
            const child = node(value, at + '.' + group + '.' + key);
            if (child.config.slug !== key) throw new Error(at + '.' + group + ': slug mismatch');
            return [
              key,
              {
                config: unwrap(value, at + '.' + group + '.' + key),
                ...(child.production ? { production: child.production } : {}),
              },
            ];
          }),
        );
      }
    } else if (typ === 'questStage') {
      const content = config.content;
      if (!isRecord(content) || !isRecord(content.video) || !isRecord(content.audio))
        throw new Error(at + ': incomplete Quest Stage media');
      const audio = content.audio;
      const get = (value: unknown, location: string) => {
        const child = node(value, location);
        return { config: unwrap(value, location), ...(child.production ? { production: child.production } : {}) };
      };
      normalized.content = {
        video: {
          medium: get(content.video.medium, at + '.video.medium'),
          small: get(content.video.small, at + '.video.small'),
        },
        audio: Object.fromEntries(
          ['dialogue', 'narration', 'background'].map(key => [
            key,
            audio[key] === null ? null : get(audio[key], at + '.audio.' + key),
          ]),
        ),
        image: get(content.image, at + '.image'),
        subtitles: get(content.subtitles, at + '.subtitles'),
      };
    } else if (typ === 'questTask') {
      const scene = node(config.scene, at + '.scene');
      normalized.scene = {
        config: unwrap(config.scene, at + '.scene'),
        ...(scene.production ? { production: scene.production } : {}),
      };
    }
    return normalized;
  }
  return { unwrap, ordered, metadata, scenes };
}

function normalizeStage2(input: LessonWorkflowStage2) {
  const normalizer = createStage2Normalizer([input.config.id]);
  return {
    sections: normalizer.ordered(input.config, 'lesson', true),
    metadata: normalizer.metadata,
    scenes: normalizer.scenes,
  };
}

/** Shared real Section/ContentBlock source dispatch for all authoring workflows. */
function createSectionSourceRenderer(metadata: Map<string, Record<string, unknown>>, documentLanguage: string) {
  function block(config: ChildConfig, context: RenderOptions): Result {
    const production = context.production ?? metadata.get(config.id);
    const opts = { ...context, ...(production ? { production } : {}) };
    const sourceOptions = { ...opts, plannedLanguages: [documentLanguage] };
    switch (config.type) {
      case 'text':
        return materializeText(config as Parameters<typeof materializeText>[0], sourceOptions);
      case 'markdown':
        return materializeMarkdown(config as Parameters<typeof materializeMarkdown>[0], sourceOptions);
      case 'code':
        return materializeCode(config as Parameters<typeof materializeCode>[0], sourceOptions);
      case 'image':
        return materializeImage(config as Parameters<typeof materializeImage>[0], sourceOptions);
      case 'video':
        return materializeVideo(config as Parameters<typeof materializeVideo>[0], sourceOptions);
      case 'youtube':
        return materializeYoutube(config as Parameters<typeof materializeYoutube>[0], sourceOptions);
      case 'audio':
        return materializeAudio(config as Parameters<typeof materializeAudio>[0], sourceOptions);
      case 'subtitles':
        return materializeSubtitles(config as Parameters<typeof materializeSubtitles>[0], sourceOptions);
      case 'scene':
        return materializeScene(config as Parameters<typeof materializeScene>[0], {
          ...opts,
          registered: false,
          production: {
            specification: typeof production?.specification === 'string' ? production.specification : undefined,
            pending: true,
          },
        });
      case 'carousel':
        return materializeCarousel(config as unknown as Parameters<typeof materializeCarousel>[0], {
          ...opts,
          renderChild: (child, directory) =>
            block(child as ChildConfig, {
              directory,
              documentLanguage,
              languagesImport: childLanguagesImport(context, directory),
              production: metadata.get(child.id),
            }),
        });
      case 'checkpoint':
        return materializeCheckpoint(config as unknown as Parameters<typeof materializeCheckpoint>[0], {
          ...opts,
          renderItem: (item, directory) =>
            materializeCheckpointItem(item, {
              directory,
              documentLanguage,
              languagesImport: childLanguagesImport(context, directory),
              renderQuestion: (text, childDir) =>
                block(text as ChildConfig, {
                  directory: childDir,
                  documentLanguage,
                  languagesImport: childLanguagesImport(context, childDir),
                  production: metadata.get(text.id),
                }),
              renderAnswer: (answer, childDir) =>
                materializeCheckpointAnswer(answer, {
                  directory: childDir,
                  documentLanguage,
                  languagesImport: childLanguagesImport(context, childDir),
                  renderChild: (child, deeper) =>
                    block(child as ChildConfig, {
                      directory: deeper,
                      documentLanguage,
                      languagesImport: childLanguagesImport(context, deeper),
                      production: metadata.get(child.id),
                    }),
                }),
            }),
        });
      default:
        throw new Error('Lesson Stage 6: unsupported ContentBlock kind ' + config.type);
    }
  }
  function stage(config: ChildConfig, opts: RenderOptions): Result {
    return materializeQuestStage(config as Parameters<typeof materializeQuestStage>[0], {
      ...opts,
      renderMedia: (media, context) => block(media, context),
    });
  }
  function task(config: ChildConfig, opts: RenderOptions): Result {
    return materializeQuestTask(config as Parameters<typeof materializeQuestTask>[0], {
      ...opts,
      renderScene: (scene, context) => block(scene, context),
    });
  }
  function section(config: ChildConfig, opts: RenderOptions): Result {
    const contentOptions = {
      ...opts,
      renderContentBlock: (child: ChildConfig, context: RenderOptions) => block(child, context),
    };
    switch (config.type) {
      case 'content':
        return materializeContentSection(config as Parameters<typeof materializeContentSection>[0], contentOptions);
      case 'practice':
        return materializePracticeSection(config as Parameters<typeof materializePracticeSection>[0], contentOptions);
      case 'codingTask':
        return materializeCodingTaskSection(
          config as Parameters<typeof materializeCodingTaskSection>[0],
          contentOptions,
        );
      case 'learningFlow':
        return materializeLearningFlowSection(
          config as Parameters<typeof materializeLearningFlowSection>[0],
          contentOptions,
        );
      case 'quiz':
        return materializeQuizSection(config as Parameters<typeof materializeQuizSection>[0], contentOptions);
      case 'flashcards':
        return materializeFlashcardsSection(
          config as Parameters<typeof materializeFlashcardsSection>[0],
          contentOptions,
        );
      case 'quest':
        return materializeQuestSection(config as Parameters<typeof materializeQuestSection>[0], {
          ...opts,
          renderStage: stage,
          renderTask: task,
        });
      default:
        throw new Error('Lesson Stage 6: unsupported Section kind ' + config.type);
    }
  }

  return section;
}

/** Render pending executable Scene drafts at their UUID-addressed textbook paths.
 * Both standalone Lessons and embedded Sections use this same source renderer.
 * This never registers a Scene or marks its implementation complete.
 */
function materializeSceneScaffolds(
  scenes: readonly { id: string; slug: string; specification?: string }[],
  sceneOutputRoot: string,
  documentLanguage: string,
): Result['files'] {
  if (!/^content\/[a-z][a-z0-9-]*\/scenes$/.test(sceneOutputRoot))
    throw new Error('Invalid UUID-addressed textbook Scene output root');
  const files: Result['files'] = [];
  for (const scene of scenes) {
    const directory = sceneOutputRoot + '/' + scene.id.at(-1) + '/' + scene.id + '/';
    for (const [name, content] of renderSceneFiles({ ...scene, documentLanguage })) {
      files.push({
        path: directory + name,
        kind: name.endsWith('.css') ? 'code' : 'typescript',
        content,
      });
    }
  }
  return files;
}

/** Materialize any reviewed Section with the ordinary Section/ContentBlock
 * dispatcher. The caller owns destination paths; the Section's type and nested
 * types never depend on whether its parent is a Course, Lesson or Episode.
 */
export function materializeWorkflowSection(
  value: LessonWorkflowStage2Section,
  options: {
    directory: string;
    documentLanguage: string;
    languagesImport: string;
    sceneOutputRoot: string;
    noteOwnership?: 'course-lesson-placement';
  },
): Result & { sceneScaffolds: Result['files'] } {
  const checked = lessonWorkflowSection_Schema.parse(value);
  const normalizer = createStage2Normalizer([]);
  const config = normalizer.unwrap(checked, 'section') as ChildConfig;
  const renderSection = createSectionSourceRenderer(normalizer.metadata, options.documentLanguage);
  const rendered = renderSection(config, {
    directory: options.directory,
    documentLanguage: options.documentLanguage,
    languagesImport: options.languagesImport,
    production: normalizer.metadata.get(config.id),
    ...(options.noteOwnership ? { noteOwnership: options.noteOwnership } : {}),
  });
  return {
    ...rendered,
    sceneScaffolds: materializeSceneScaffolds(normalizer.scenes, options.sceneOutputRoot, options.documentLanguage),
  };
}

/**
 * One explicit Lesson Stage 6.1 composition, not a universal kind registry.
 * Concrete materializers own rendering/diagnostics for their real Config
 * kinds. Required assessment Sections are verified in materializeLesson.
 */
export function materializeLessonStage6(input: LessonWorkflowStage2, options: LessonStage6Options): LessonStage6Plan {
  return planLessonStage6(input, options);
}

function planLessonStage6(input: LessonWorkflowStage2, options: LessonStage6Options): LessonStage6Plan {
  if (!isRecord(input) || !isRecord(input.config) || !isRecord(input.production))
    throw new Error('Lesson Stage 6 requires the canonical Stage 2 envelope');
  const config = input.config;
  const source = options?.source;
  const match = source?.sourcePath?.match(
    /^content\/([a-z][a-z0-9-]*)\/data\/lessons\/([0-9a-f])\/([0-9a-f-]{36})\/draft\.ts$/,
  );
  if (
    !source ||
    config.type !== 'lesson' ||
    !uuid.test(config.id) ||
    typeof config.slug !== 'string' ||
    !safeSlug.test(config.slug) ||
    !match ||
    match[3] !== config.id ||
    match[2] !== config.id.slice(-1).toLowerCase() ||
    !sha.test(source.sourceBlobSha) ||
    !sha.test(source.sourceCommitSha) ||
    typeof options.sourceText !== 'string' ||
    gitBlobSha(options.sourceText) !== source.sourceBlobSha ||
    typeof options.verifySourceInput !== 'function' ||
    options.verifySourceInput(input, source, options.sourceText) !== true
  )
    throw new Error('Lesson Stage 6: untrusted source or stale source snapshot');

  const languagePlan = workflowLanguages_Schema.safeParse(input.production.languages);
  if (!languagePlan.success) throw new Error('Lesson Stage 6: invalid reviewed document/planned languages');
  const { document: documentLanguage, planned } = languagePlan.data;
  if (config.params?.languages !== undefined) throw new Error('Lesson Stage 2 must not contain final params.languages');
  const params = {
    ...config.params,
    languages: [...planned],
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true,
      ...config.params?.sections,
    },
  };
  const parsed = lesson_Config_Schema.shape.params.safeParse(params);
  if (!parsed.success)
    throw new Error('Lesson Stage 6: incomplete or invalid Lesson Config params: ' + parsed.error.message);
  if (!lesson_Config_Schema.shape.locale.safeParse(config.locale).success)
    throw new Error('Lesson Stage 6: invalid source-language Lesson title/locale');
  const assessment = input.production.assessment;
  if (!lessonProductionAssessmentRequirements_Schema.safeParse(assessment).success)
    throw new Error('Lesson Stage 6: four independent assessment decisions are required');
  const { sections, metadata, scenes } = normalizeStage2(input);
  // Validate the actual editorial input before calling any source renderer.
  // Keep the original object for source fidelity; parsing is not a new authored representation.
  const validated = lessonWorkflowStage2_Schema.safeParse(input);
  if (!validated.success) throw new Error('Invalid Lesson Stage 2 input: ' + validated.error.message);

  const section = createSectionSourceRenderer(metadata, documentLanguage);

  const skillReferences =
    options.trustedSkillReferences === undefined
      ? reviewedSkillReferences(options.sourceText, source.sourcePath, input)
      : options.trustedSkillReferences.map((skill, index) => {
          if (!skill) return null;
          if (
            skill.approved !== true ||
            skill.id !== config.skills[index] ||
            !sha.test(skill.sourceSha) ||
            !/^#skillsData\/(?:[A-Za-z][A-Za-z0-9]*\/)*[A-Za-z][A-Za-z0-9]*$/.test(skill.path) ||
            !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(skill.exported)
          )
            throw Error('Lesson Stage 6: unapproved or mismatched trusted Skill dependency');
          return { id: skill.id, path: skill.path, exported: skill.exported };
        });
  if (skillReferences.length !== config.skills.length)
    throw Error('Lesson Stage 6: trusted Skill inventory length mismatch');
  const result = materializeLesson(
    {
      ...config,
      params: parsed.data,
      ...sections,
    } as unknown as Parameters<typeof materializeLesson>[0],
    {
      documentLanguage,
      production: input.production as unknown as Record<string, unknown> & { assessment: typeof assessment },
      skillReferences,
      renderSection: section,
    },
  );
  const root = source.sourcePath.slice(0, -'draft.ts'.length);
  const files = preserveAssessmentReferences(
    options.sourceText,
    source.sourcePath,
    input,
    result.files.map(file => ({ ...file, path: root + file.path })),
    options.trustedBankSelections,
  );
  // The nested defineScene sources stay within Lesson ownership. Executable
  // Scene drafts belong to the textbook's independent UUID-scoped scene tree.
  // Stage 6.1 includes both in ONE attested source plan and Git transaction.
  files.push(...materializeSceneScaffolds(scenes, 'content/' + match[1] + '/scenes', documentLanguage));
  return {
    lessonId: config.id,
    sourcePath: source.sourcePath,
    materializedPath: root + 'index.ts',
    sourceBlobSha: source.sourceBlobSha,
    sourceCommitSha: source.sourceCommitSha,
    publishable: false,
    files,
    diagnostics: result.diagnostics,
  };
}

/**
 * The Stage 6 result is never a publication certificate. Refuse all visible
 * editorial/media placeholders even if one concrete renderer omitted a
 * diagnostic. Downstream asset, bank, localization and provenance validation
 * remains the independent publication boundary.
 */
export function assertLessonStage6ReleaseReady(plan: LessonStage6Plan): void {
  const pending = plan.files.filter(file =>
    /TODO\s*\(BLOCKER\)|TODO\(asset\)|00000000-0000-0000-0000-000000000000/i.test(file.content),
  );
  if (pending.length)
    throw new Error(
      'Lesson source publication blocked by unresolved placeholders in ' + pending.map(file => file.path).join(', '),
    );
  assertLessonSourceReleaseReady({
    exportName: '',
    files: plan.files,
    diagnostics: plan.diagnostics,
  });
}
