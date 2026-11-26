import { createSourceIdentifierRegistry, renderSourceItem } from '../sourceIdentifiers.mjs';
import type { ContentBlock_CheckpointItem_Config } from '../../../configurators/contentBlocks/composite/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import type { ContentBlock_Text_Config } from '../../../configurators/contentBlocks/primitive/defineText/defineText.schemas';
import type { CheckpointAnswerSource } from '../checkpointAnswer/materializeCheckpointAnswer';

export type CheckpointItemSource = Omit<ContentBlock_CheckpointItem_Config, 'question' | 'answer'> & {
  question: ContentBlock_Text_Config;
  answer: CheckpointAnswerSource;
};
export type CheckpointItemFile = {
  path: string;
  content: string;
  kind: 'typescript' | 'specification' | 'markdown' | 'code';
};
export type CheckpointItemDiagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type CheckpointItemResult = {
  exportName: string;
  files: CheckpointItemFile[];
  diagnostics: CheckpointItemDiagnostic[];
};
export type CheckpointItemContext = {
  directory: string;
  documentLanguage: string;
  languagesImport: string;
  renderQuestion: (config: ContentBlock_Text_Config, directory: string) => CheckpointItemResult;
  renderAnswer: (config: CheckpointAnswerSource, directory: string) => CheckpointItemResult;
};
const slug = /^[a-z][a-zA-Z0-9]*$/;
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const locale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const reserved = new Set(
  'await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static'.split(
    ' ',
  ),
);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function safeDirectory(value: string): string {
  if (value === '') return value;
  if (
    typeof value !== 'string' ||
    value.startsWith('/') ||
    value.split('/').some(part => !slug.test(part) || part === 'constructor' || part === '__proto__')
  ) {
    throw new Error('CheckpointItem: unsafe directory ' + value);
  }
  return value;
}
/** Emit the item from real Text/Answer child sources; never create a synthetic answer. */
export function materializeCheckpointItem(
  config: CheckpointItemSource,
  context: CheckpointItemContext,
): CheckpointItemResult {
  if (
    !record(config) ||
    config.type !== 'checkpointItem' ||
    typeof config.slug !== 'string' ||
    !slug.test(config.slug) ||
    !uuid.test(config.id) ||
    (config.check !== undefined && config.check !== true)
  ) {
    throw new Error('CheckpointItem: invalid identity, type or check flag');
  }
  if (!locale.test(context.documentLanguage) || !/^(?:\.\.?\/|#|@svitlo\/)/.test(context.languagesImport)) {
    throw new Error('CheckpointItem: documentLanguage and languages import are required');
  }
  if (
    !record(config.question) ||
    config.question.type !== 'text' ||
    !uuid.test(config.question.id) ||
    !slug.test(config.question.slug) ||
    config.question.params?.disabled === true
  ) {
    throw new Error('CheckpointItem.question: enabled Text Config is required');
  }
  if (
    !record(config.answer) ||
    config.answer.type !== 'checkpointAnswer' ||
    !uuid.test(config.answer.id) ||
    !slug.test(config.answer.slug)
  ) {
    throw new Error('CheckpointItem.answer: CheckpointAnswer Config is required');
  }
  if (new Set([config.id, config.question.id, config.answer.id]).size !== 3) {
    throw new Error('CheckpointItem: UUIDs must be distinct');
  }
  const directory = safeDirectory(context.directory);
  const prefix = directory ? directory + '/' : '';
  const question = context.renderQuestion(config.question, prefix + 'question');
  const answer = context.renderAnswer(config.answer, prefix + 'answer');
  if (
    !question ||
    !answer ||
    !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(question.exportName) ||
    !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(answer.exportName)
  ) {
    throw new Error('CheckpointItem: child materializers must return named exports');
  }
  const files: CheckpointItemFile[] = [];
  const paths = new Set<string>();
  for (const [result, ownedDirectory] of [
    [question, prefix + 'question'],
    [answer, prefix + 'answer'],
  ] as const) {
    for (const file of result.files) {
      if (!file.path.startsWith(ownedDirectory + '/')) {
        throw new Error('CheckpointItem: child emitted a file outside its owned directory: ' + file.path);
      }
      if (paths.has(file.path) || file.path === prefix + 'index.ts') {
        throw new Error('CheckpointItem: duplicate child file ' + file.path);
      }
      paths.add(file.path);
      files.push(file);
    }
  }
  const exportName = reserved.has(config.slug) ? 'config_' + config.slug : config.slug;
  const claim = createSourceIdentifierRegistry('checkpointItem', ['defineCheckpointItem', 'languages', exportName]);
  claim(question.exportName, 'question');
  claim(answer.exportName, 'answer');
  const code = [
    "import { defineCheckpointItem } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(context.languagesImport) + ';',
    'import { ' + question.exportName + ' } from "./question";',
    'import { ' + answer.exportName + ' } from "./answer";',
    '',
    'export const ' +
      exportName +
      ' = defineCheckpointItem<' +
      JSON.stringify(config.slug) +
      ', typeof ' + answer.exportName + ', typeof ' + question.exportName + ', typeof languages>({',
    '  id: ' + JSON.stringify(config.id) + ',',
    '  slug: ' + JSON.stringify(config.slug) + ',',
    "  type: 'checkpointItem',",
    ...(config.check === true ? ['  check: true,'] : []),
    '  ' + renderSourceItem('question', question.exportName) + ',',
    '  ' + renderSourceItem('answer', answer.exportName) + ',',
    '});',
    '',
  ].join('\n');
  files.push({ path: prefix + 'index.ts', content: code, kind: 'typescript' });
  return { exportName, files, diagnostics: [...question.diagnostics, ...answer.diagnostics] };
}
