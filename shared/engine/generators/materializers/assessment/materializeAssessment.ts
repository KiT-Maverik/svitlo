import { createHash } from 'node:crypto';
import {
  assessmentWorkflowStage2_Schema,
  type AssessmentWorkflowStage2,
} from '../../../types/workflow/assessmentWorkflow.types';
import { invokeMaterializer } from '../directMaterialization/directMaterialization';
import { materializeContentSection } from '../contentSection/contentSection';
import { materializeQuizSection } from '../quizSection/quizSection';
import { materializeText } from '../text/materializeText';
import { materializeMarkdown } from '../markdown/materializeMarkdown';
import { materializeCode } from '../code/materializeCode';
import { materializeImage } from '../image/materializeImage';
import { materializeVideo } from '../video/materializeVideo';
import { materializeYoutube } from '../youtube/materializeYoutube';
import { materializeAudio } from '../audio/materializeAudio';
import { materializeSubtitles } from '../subtitles/materializeSubtitles';
import { materializeScene } from '../scene/materializeScene';
import { materializeCarousel } from '../carousel/materializeCarousel';
import { materializeCheckpoint } from '../checkpoint/materializeCheckpoint';
import { materializeCheckpointItem } from '../checkpointItem/materializeCheckpointItem';
import { materializeCheckpointAnswer } from '../checkpointAnswer/materializeCheckpointAnswer';

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
  'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
  'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try',
  'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static',
  'implements', 'interface', 'private', 'protected', 'public', 'package',
  'content', 'languages', 'section', 'quiz',
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
    /^content\/([a-z][a-z0-9-]*)\/data\/courses\/([0-9a-f])\/([0-9a-f-]{36})\/(content\/(?:[A-Za-z][A-Za-z0-9]*\/)*[A-Za-z][A-Za-z0-9]*)\/draft\.ts$/i,
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
    production.placement.courseId !== courseId ||
    production.placement.path !== placement ||
    production.placement.reviewedCourseSourceBlobSha.length !== 40 ||
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
      if (
        !record(collection) ||
        !record(collection.items) ||
        !Array.isArray(collection.order) ||
        new Set(collection.order).size !== collection.order.length ||
        Object.keys(collection.items).length !== collection.order.length ||
        collection.order.some(
          key => typeof key !== 'string' || !Object.hasOwn(collection.items as Record<string, unknown>, key),
        )
      )
        throw Error(name + ': invalid authored order');
      return {
        items: Object.fromEntries(
          Object.entries(collection.items).map(([key, child]) => {
            const node = plain(child, name + '.' + key);
            if (node.config.slug !== key) throw Error(name + '.' + key + ': child key/slug mismatch');
            const normalized = unwrap(child, name + '.' + key);
            return [
              key,
              preserveEnvelope
                ? {
                    config: normalized,
                    ...(node.production ? { production: node.production } : {}),
                  }
                : normalized,
            ];
          }),
        ),
        order: [...collection.order],
      };
    };
    if (['content', 'quiz'].includes(current.type)) current.content = ordered(current.content, path + '.content', true);
    else if (current.type === 'carousel') current.slides = ordered(current.slides, path + '.slides', false);
    else if (current.type === 'checkpoint') current.content = ordered(current.content, path + '.content', false);
    else if (current.type === 'checkpointItem') {
      current.question = unwrap(current.question, path + '.question');
      current.answer = unwrap(current.answer, path + '.answer');
    } else if (current.type === 'checkpointAnswer')
      current.content = ordered(current.content, path + '.content', false);
    return current;
  };
  const sections = Object.fromEntries(
    Object.entries(config.section.items).map(([key, value]) => {
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
  for (const value of Object.values(config.section.items)) {
    if (value.config.type !== 'quiz' || value.config.params.disabled === true) continue;
    const ids = value.config.params.selection?.questionIds ?? [];
    for (const id of ids) {
      if (!uuid.test(id) || /^feedc0de-|^00000000-/.test(id))
        throw Error('Assessment: no fabricated or unresolved Quiz Question UUIDs');
      questionIds.push(id);
    }
  }
  if (!questionIds.length) throw Error('Assessment requires real upstream Question selection');

  const ownDirectory = placement;
  // The Course only declares a local `languages` constant; it has no
  // guaranteed #coursesData/.../languages module. Own the Assessment source
  // languages and import them relatively from every nested Section/Block.
  const languageImport = (directory: string) => {
    const relative = directory.slice(ownDirectory.length).replace(/^\//, '');
    if (relative && (!directory.startsWith(ownDirectory + '/') || relative.split('/').some(part => !slug.test(part))))
      throw Error('Assessment Section escaped its own language scope: ' + directory);
    return relative ? '../'.repeat(relative.split('/').length) + 'languages' : './languages';
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
  const renderedSectionItems: string[] = [];
  for (const key of config.section.order) {
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
    const alias = 'child_section_' + key;
    imports.push(
      'import { ' + childResult.exportName + ' as ' + alias + ' } from ' + JSON.stringify('./sections/' + key) + ';',
    );
    renderedSectionItems.push(JSON.stringify(key) + ': ' + alias);
  }
  const rendered = [
    "import { defineAssessment } from '@svitlo/engine/build';",
    'import { languages } from "./languages";',
    ...imports,
    '',
    '// TODO (BLOCKER): Validate selected Questions against reviewed upstream Lesson banks before release.',
    planned.length > 1 ? '// TODO (BLOCKER): Complete reviewed Assessment localizations before release.' : '',
    'const section = { items: { ' +
      renderedSectionItems.join(', ') +
      ' }, order: ' +
      JSON.stringify(config.section.order) +
      ' };',
    'export const ' +
      exportName(config.slug) +
      ' = defineAssessment<' +
      JSON.stringify(config.slug) +
      ', typeof languages, typeof section.items>({',
    '  id: ' + JSON.stringify(config.id) + ', type: "assessment", slug: ' + JSON.stringify(config.slug) + ',',
    '  params: { ...' + JSON.stringify(config.params ?? {}) + ', languages },',
    '  locale: ' + JSON.stringify(config.locale) + ',',
    '  section,',
    '});',
    '',
  ]
    .filter(Boolean)
    .join('\n');
  files.push({
    path: ownDirectory + '/languages.ts',
    content:
      '// Authored source locale only; planned translations require independent review.\n' +
      'export const languages = ' +
      JSON.stringify([document]) +
      ' as const;\n',
    kind: 'typescript',
  });
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
  options?: AssessmentMaterializationOptions,
): AssessmentMaterializationPlan {
  return invokeMaterializer('assessment-stage4', options, resolved => plan(input, resolved), input);
}
