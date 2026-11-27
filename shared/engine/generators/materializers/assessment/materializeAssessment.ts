import { createHash } from 'node:crypto';

import {
  assessmentWorkflowStage2_Schema,
  type AssessmentWorkflowStage2,
} from '../../../types/workflow/assessmentWorkflow.types';
import { materializeAudio } from '../audio/materializeAudio';
import { materializeCarousel } from '../carousel/materializeCarousel';
import { materializeCheckpoint } from '../checkpoint/materializeCheckpoint';
import { materializeCheckpointAnswer } from '../checkpointAnswer/materializeCheckpointAnswer';
import { materializeCheckpointItem } from '../checkpointItem/materializeCheckpointItem';
import { materializeCode } from '../code/materializeCode';
import { materializeContentSection } from '../contentSection/contentSection';
import { materializeImage } from '../image/materializeImage';
import { materializeMarkdown } from '../markdown/materializeMarkdown';
import { normalizeWorkflowLocalized } from '../normalizeWorkflowLocalized.mjs';
import { materializeQuizSection } from '../quizSection/quizSection';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';
import { materializeScene } from '../scene/materializeScene';
import { createSourceIdentifierRegistry, renderSourceItem } from '../sourceIdentifiers.mjs';
import { materializeSubtitles } from '../subtitles/materializeSubtitles';
import { materializeText } from '../text/materializeText';
import { materializeVideo } from '../video/materializeVideo';
import { materializeYoutube } from '../youtube/materializeYoutube';

export type AssessmentMaterializationSource = {
  sourcePath: string;
  sourceBlobSha: string;
  sourceCommitSha: string;
};
export type AssessmentMaterializationOptions = {
  source: AssessmentMaterializationSource;
  sourceText: string;
  verifySourceInput: (
    input: Readonly<AssessmentWorkflowStage2>,
    source: Readonly<AssessmentMaterializationSource>,
    text: string,
  ) => boolean;
};
type GeneratedFile = {
  path: string;
  kind: 'typescript' | 'specification' | 'markdown' | 'code';
  content: string;
};
type Diagnostic = { path: string; code: string; severity: 'warning'; message: string };
type PlanDiagnostic = Diagnostic | { path: string; code: string; severity: 'blocker'; message: string };
type Result = { exportName: string; files: GeneratedFile[]; diagnostics: Diagnostic[] };
type Config = Record<string, unknown> & { type: string; slug: string; id: string };
type RenderOptions = {
  directory: string;
  documentLanguage: string;
  languagesImport: string;
  production?: Record<string, unknown>;
};
export type AssessmentMaterializationPlan = {
  assessmentId: string;
  courseId: string;
  placement: string;
  sourcePath: string;
  materializedPath: string;
  sourceBlobSha: string;
  sourceCommitSha: string;
  sourceExportName: string;
  selectedQuestionIds: readonly string[];
  files: GeneratedFile[];
  diagnostics: PlanDiagnostic[];
  publishable: false;
};

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const sha = /^[a-f0-9]{40}$/i;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const record = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
const reservedNames = new Set([
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
  'let',
  'static',
  'implements',
  'interface',
  'private',
  'protected',
  'public',
  'package',
  'content',
  'languages',
  'section',
  'quiz',
]);
const exportName = (value: string) => (reservedNames.has(value) ? 'config_' + value : value);
const plain = (value: unknown, path: string): { config: Config; production?: Record<string, unknown> } => {
  if (
    !record(value) ||
    !record(value.config) ||
    typeof value.config.type !== 'string' ||
    typeof value.config.slug !== 'string' ||
    !slug.test(value.config.slug) ||
    typeof value.config.id !== 'string' ||
    !uuid.test(value.config.id) ||
    (value.production !== undefined && !record(value.production))
  )
    throw Error(path + ': expected an authored, UUID-owned plain Config node');
  return { config: value.config as Config, ...(record(value.production) ? { production: value.production } : {}) };
};
const digest = (data: string) =>
  createHash('sha1')
    .update('blob ' + Buffer.byteLength(data, 'utf8') + '\0')
    .update(data, 'utf8')
    .digest('hex');

function plan(
  input: AssessmentWorkflowStage2,
  options: AssessmentMaterializationOptions,
): AssessmentMaterializationPlan {
  const checked = assessmentWorkflowStage2_Schema.safeParse(input);
  if (!checked.success) throw Error('Invalid reviewed Assessment Stage 2: ' + checked.error.message);
  const source = options?.source;
  const sourceMatch = source?.sourcePath.match(
    /^content\/([a-z][a-z0-9-]*)\/data\/courses\/([0-9a-f])\/([0-9a-f-]{36})\/((?:[A-Za-z][A-Za-z0-9]*\/){0,2}[A-Za-z][A-Za-z0-9]*)\/draft\.ts$/i,
  );
  if (
    !source ||
    !sourceMatch ||
    !uuid.test(sourceMatch[3]) ||
    sourceMatch[2] !== sourceMatch[3].at(-1)?.toLowerCase() ||
    !sha.test(source.sourceBlobSha) ||
    !sha.test(source.sourceCommitSha) ||
    typeof options.sourceText !== 'string' ||
    digest(options.sourceText) !== source.sourceBlobSha ||
    typeof options.verifySourceInput !== 'function' ||
    options.verifySourceInput(input, source, options.sourceText) !== true
  )
    throw Error('Assessment: untrusted or stale pinned Stage 2 source');
  const { config, production } = checked.data;
  const { document, planned } = production.languages;
  const courseId = sourceMatch[3].toLowerCase();
  const placement = sourceMatch[4];
  if (
    config.id !== config.id.toLowerCase() ||
    config.slug !== placement.split('/').at(-1) ||
    !sha.test(production.reviewedCourseSourceBlobSha ?? '') ||
    !planned.includes(document)
  )
    throw Error('Assessment: Course-owned UUID/placement/source language mismatch');

  const metadata = new Map<string, Record<string, unknown>>();
  const seenIds = new Set([config.id]);
  const unwrap = (value: unknown, path: string): Config => {
    const result = plain(value, path);
    if (seenIds.has(result.config.id)) throw Error(path + ': duplicate authored UUID');
    seenIds.add(result.config.id);
    if (result.production) metadata.set(result.config.id, result.production);
    const current = { ...result.config };
    const ordered = (collection: unknown, name: string, preserveEnvelope: boolean) => {
      if (!record(collection) || !Array.isArray(collection.children) ||
          Object.hasOwn(collection, 'content') || Object.hasOwn(collection, 'slides'))
        throw Error(name + ': expected root children');
      const own = new Set(['id','type','slug','params','locale','children','draft']);
      const members = Object.entries(collection).filter(([key]) => !own.has(key));
      const keys = members.map(([key]) => key);
      if (keys.length !== collection.children.length ||
          new Set(collection.children).size !== keys.length ||
          collection.children.some(key => typeof key !== 'string' || !Object.hasOwn(collection, key) || own.has(key)))
        throw Error(name + '.children: invalid authored child order');
      return {
        children: [...collection.children],
        ...Object.fromEntries(members.map(([key, child]) => {
          const node = plain(child, name + '.' + key);
          if (node.config.slug !== key) throw Error(name + '.' + key + ': child key/slug mismatch');
          const normalized = unwrap(child, name + '.' + key);
          return [key, preserveEnvelope
            ? { config: normalized, ...(node.production ? { production: node.production } : {}) }
            : normalized];
        })),
      };
    };
    if (['content', 'quiz'].includes(current.type))
      Object.assign(current, ordered(current, path, true));
    else if (current.type === 'carousel' || current.type === 'checkpoint')
      Object.assign(current, ordered(current, path, false));
    else if (current.type === 'checkpointItem') {
      current.question = unwrap(current.question, path + '.question');
      current.answer = unwrap(current.answer, path + '.answer');
    } else if (current.type === 'checkpointAnswer')
      Object.assign(current, ordered(current, path, false));
    return current;
  };
  const before = config.before ?? { children: [] };
  const after = config.after ?? { children: [] };
  const quizKey = config.quiz.config.slug;
  const phaseItems = (phase: { children: string[] } & Record<string, unknown>, label: string) => {
    const members = Object.entries(phase).filter(([key]) => key !== 'children');
    const keys = members.map(([key]) => key);
    if (keys.length !== phase.children.length || new Set(phase.children).size !== keys.length ||
        phase.children.some(key => !Object.hasOwn(phase, key) || key === 'children'))
      throw Error('Assessment ' + label + ': invalid direct Section children');
    return Object.fromEntries(members);
  };
  const sectionOrder = [...before.children, quizKey, ...after.children];
  if (new Set(sectionOrder).size !== sectionOrder.length)
    throw Error('Assessment: supporting Section slug collides with Quiz');
  const sectionNodes = { ...phaseItems(before, 'before'), [quizKey]: config.quiz, ...phaseItems(after, 'after') };
  const sections = Object.fromEntries(
    Object.entries(sectionNodes).map(([key, value]) => {
      const node = plain(value, 'assessment.section.' + key);
      if (node.config.slug !== key) throw Error('Assessment Section key/slug mismatch: ' + key);
      return [
        key,
        {
          config: unwrap(value, 'assessment.section.' + key),
          ...(node.production ? { production: node.production } : {}),
        },
      ];
    }),
  );
  const questionIds: string[] = [];
  const ids = config.quiz.config.params.selection?.questionIds ?? [];
  for (const id of ids) {
    if (!uuid.test(id) || /^feedc0de-|^00000000-/.test(id))
      throw Error('Assessment: no fabricated or unresolved Quiz Question UUIDs');
    questionIds.push(id);
  }
  if (!questionIds.length) throw Error('Assessment requires real upstream Question selection');

  const ownDirectory = placement;
  // A Course owns one source-language constant; nested Assessment Sections
  // and ContentBlocks resolve the same trusted root module, not local copies.
  const courseLanguagesImport = '#coursesData/' + courseId.at(-1) + '/' + courseId + '/constants';
  const languageImport = (directory: string) => {
    const relative = directory.slice(ownDirectory.length).replace(/^\//, '');
    if (relative && (!directory.startsWith(ownDirectory + '/') || relative.split('/').some(part => !slug.test(part))))
      throw Error('Assessment Section escaped its Course-owned locale scope: ' + directory);
    return courseLanguagesImport;
  };
  const files: GeneratedFile[] = [];
  const diagnostics: PlanDiagnostic[] = [];
  const renderBlock = (block: Config, context: RenderOptions): Result => {
    const current = { ...context, ...(metadata.has(block.id) ? { production: metadata.get(block.id) } : {}) };
    switch (block.type) {
      case 'text':
        return materializeText(block as Parameters<typeof materializeText>[0], current);
      case 'markdown':
        return materializeMarkdown(block as Parameters<typeof materializeMarkdown>[0], current);
      case 'code':
        return materializeCode(block as Parameters<typeof materializeCode>[0], current);
      case 'image':
        return materializeImage(block as Parameters<typeof materializeImage>[0], current);
      case 'video':
        return materializeVideo(block as Parameters<typeof materializeVideo>[0], current);
      case 'youtube':
        return materializeYoutube(block as Parameters<typeof materializeYoutube>[0], current);
      case 'audio':
        return materializeAudio(block as Parameters<typeof materializeAudio>[0], current);
      case 'subtitles':
        return materializeSubtitles(block as Parameters<typeof materializeSubtitles>[0], current);
      case 'scene':
        return materializeScene(block as Parameters<typeof materializeScene>[0], {
          ...current,
          registered: false,
          production: {
            specification:
              typeof current.production?.specification === 'string' ? current.production.specification : undefined,
            pending: true,
          },
        });
      case 'carousel':
        return materializeCarousel(block as unknown as Parameters<typeof materializeCarousel>[0], {
          ...current,
          renderChild: (child, directory) =>
            renderBlock(child as Config, {
              directory,
              documentLanguage: document,
              languagesImport: languageImport(directory),
              production: metadata.get(child.id),
            }),
        });
      case 'checkpoint':
        return materializeCheckpoint(block as unknown as Parameters<typeof materializeCheckpoint>[0], {
          ...current,
          renderItem: (item, directory) =>
            materializeCheckpointItem(item, {
              directory,
              documentLanguage: document,
              languagesImport: languageImport(directory),
              renderQuestion: (question, childDir) =>
                renderBlock(question as Config, {
                  directory: childDir,
                  documentLanguage: document,
                  languagesImport: languageImport(childDir),
                  production: metadata.get(question.id),
                }),
              renderAnswer: (answer, childDir) =>
                materializeCheckpointAnswer(answer, {
                  directory: childDir,
                  documentLanguage: document,
                  languagesImport: languageImport(childDir),
                  renderChild: (child, deeper) =>
                    renderBlock(child as Config, {
                      directory: deeper,
                      documentLanguage: document,
                      languagesImport: languageImport(deeper),
                      production: metadata.get(child.id),
                    }),
                }),
            }),
        });
      default:
        throw Error('Assessment: unsupported ContentBlock kind ' + block.type);
    }
  };
  const imports: string[] = [];
  const sectionNames: Record<string, string> = {};
  const claim = createSourceIdentifierRegistry('assessment', [
    'defineAssessment',
    'languages',
    'before',
    'after',
    exportName(config.slug),
  ]);
  for (const key of sectionOrder) {
    const wrapped = sections[key];
    if (!wrapped) throw Error('Assessment: missing ordered Section ' + key);
    const section = wrapped.config as Config;
    const directory = ownDirectory + '/sections/' + key;
    const renderContentBlock = (child: Config, context: RenderOptions) => renderBlock(child, context);
    const opts = {
      directory,
      documentLanguage: document,
      languagesImport: languageImport(directory),
      ...(wrapped.production ? { production: wrapped.production } : {}),
      renderContentBlock,
    };
    const childResult =
      section.type === 'quiz'
        ? materializeQuizSection(section as Parameters<typeof materializeQuizSection>[0], opts)
        : materializeContentSection(section as Parameters<typeof materializeContentSection>[0], opts);
    files.push(...childResult.files);
    diagnostics.push(...childResult.diagnostics);
    const name = claim(childResult.exportName, 'sections.' + key);
    sectionNames[key] = name;
    imports.push('import { ' + name + ' } from ' + JSON.stringify('./sections/' + key) + ';');
  }
  const reviewedLocale = {
    ...config.locale,
    title: normalizeWorkflowLocalized(config.locale.title, document, ownDirectory + '.locale.title', planned),
  };
  const rendered = [
    "import { defineAssessment } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(courseLanguagesImport) + ';',
    ...imports,
    '',
    renderBlockerTodo(
      'Resolve each selected Question against a reviewed integrated upstream Lesson Question Bank before releasing this Assessment.',
    ),
    planned.length > 1
      ? renderBlockerTodo('Complete and independently review all planned Assessment localizations before release.')
      : '',
    'const before = { children: ' + JSON.stringify(before.children) + ', ' +
      before.children.map(key => renderSourceItem(key, sectionNames[key])).join(', ') + ' };',
    'const after = { children: ' + JSON.stringify(after.children) + ', ' +
      after.children.map(key => renderSourceItem(key, sectionNames[key])).join(', ') + ' };',

    'export const ' +
      exportName(config.slug) +
      ' = defineAssessment<' +
      JSON.stringify(config.slug) +
      ', typeof languages, typeof before, typeof ' +
      sectionNames[quizKey] +
      ', typeof after>({',
    '  id: ' + JSON.stringify(config.id) + ', type: "assessment", slug: ' + JSON.stringify(config.slug) + ',',
    '  params: { ...' + JSON.stringify(config.params ?? {}) + ', languages },',
    '  locale: ' + JSON.stringify(reviewedLocale) + ',',
    '  before, ' + renderSourceItem('quiz', sectionNames[quizKey]) + ', after,',
    '});',
    '',
  ]
    .filter(Boolean)
    .join('\n');
  files.push({ path: ownDirectory + '/index.ts', content: rendered, kind: 'typescript' });
  const specification =
    '# Assessment design\n\n' +
    production.design +
    '\n\n' +
    '## Reviewed content specification\n\n' +
    production.specification +
    '\n\n' +
    '## Upstream Lesson dependencies\n\n' +
    production.lessonDependencies.map(x => '- ' + x).join('\n') +
    '\n';
  files.push({ path: ownDirectory + '/specification.md', kind: 'specification', content: specification });
  const seen = new Set<string>();
  for (const file of files) {
    if (!file.path.startsWith(ownDirectory + '/') || seen.has(file.path))
      throw Error('Assessment generated file escaped placement or duplicated path: ' + file.path);
    seen.add(file.path);
  }
  diagnostics.push({
    path: ownDirectory + '/index.ts',
    code: 'pending-assessment-question-resolution',
    severity: 'blocker',
    message: 'Selected Questions must resolve to reviewed integrated upstream Lesson Question Banks',
  });
  return {
    assessmentId: config.id,
    courseId,
    placement,
    sourcePath: source.sourcePath,
    materializedPath: source.sourcePath.replace(/draft\.ts$/, 'index.ts'),
    sourceBlobSha: source.sourceBlobSha,
    sourceCommitSha: source.sourceCommitSha,
    sourceExportName: exportName(config.slug),
    selectedQuestionIds: questionIds,
    files,
    diagnostics,
    publishable: false,
  };
}

/** One reviewed direct TypeScript invocation, without an alternate parser or generator. */
export function materializeAssessment(
  input: AssessmentWorkflowStage2,
  options: AssessmentMaterializationOptions,
): AssessmentMaterializationPlan {
  return plan(input, options);
}
