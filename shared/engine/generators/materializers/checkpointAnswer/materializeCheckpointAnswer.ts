import type { ContentBlock_CheckpointAnswer_Config } from '../../../configurators/contentBlocks/composite/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import { primitiveContentBlockTypes } from '../../../configurators/contentBlocks/contentBlock.constants';
import type { ContentBlock_Audio_Config } from '../../../configurators/contentBlocks/primitive/defineAudio/defineAudio.schemas';
import type { ContentBlock_Code_Config } from '../../../configurators/contentBlocks/primitive/defineCode/defineCode.schemas';
import type { ContentBlock_Image_Config } from '../../../configurators/contentBlocks/primitive/defineImage/defineImage.schemas';
import type { ContentBlock_Markdown_Config } from '../../../configurators/contentBlocks/primitive/defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Subtitles_Config } from '../../../configurators/contentBlocks/primitive/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Text_Config } from '../../../configurators/contentBlocks/primitive/defineText/defineText.schemas';
import type { ContentBlock_Video_Config } from '../../../configurators/contentBlocks/primitive/defineVideo/defineVideo.schemas';
import type { ContentBlock_Youtube_Config } from '../../../configurators/contentBlocks/primitive/defineYoutube/defineYoutube.schemas';
import type { SceneSource } from '../scene/materializeScene';
import { createSourceIdentifierRegistry, renderSourceItem } from '../sourceIdentifiers.mjs';

export type CheckpointAnswerBlockSource =
  | ContentBlock_Audio_Config
  | ContentBlock_Code_Config
  | ContentBlock_Image_Config
  | ContentBlock_Markdown_Config
  | SceneSource
  | ContentBlock_Subtitles_Config
  | ContentBlock_Text_Config
  | ContentBlock_Video_Config
  | ContentBlock_Youtube_Config;
export type CheckpointAnswerSource = ContentBlock_CheckpointAnswer_Config & { children: string[] };
export type AnswerFile = { path: string; content: string; kind: 'typescript' | 'specification' | 'markdown' | 'code' };
export type AnswerDiagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type AnswerResult = { exportName: string; files: AnswerFile[]; diagnostics: AnswerDiagnostic[] };
export type AnswerContext = {
  directory: string;
  documentLanguage: string;
  languagesImport: string;
  /** Direct Primitive child materializer, never a generic serializer. */
  renderChild: (config: CheckpointAnswerBlockSource, directory: string) => AnswerResult;
};
const slug = /^[a-z][a-zA-Z0-9]*$/;
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const locale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const reserved = new Set(
  'await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static'.split(
    ' ',
  ),
);
const allowed: ReadonlySet<string> = new Set(primitiveContentBlockTypes);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function directory(value: string): string {
  if (value === '') return value;
  if (
    typeof value !== 'string' ||
    value.startsWith('/') ||
    value.split('/').some(part => !slug.test(part) || part === 'constructor' || part === '__proto__')
  ) {
    throw new Error('CheckpointAnswer: unsafe destination directory ' + value);
  }
  return value;
}
function literal(value: unknown, path: string, level = 0): string {
  if (value === undefined) return 'undefined';
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value))
    return '[' + value.map((part, i) => literal(part, path + '[' + i + ']', level + 1)).join(', ') + ']';
  if (!record(value) || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) {
    throw new Error(path + ': unsupported source expression; delegate to its concrete materializer');
  }
  const entries = Object.entries(value);
  return entries.length
    ? '{\n' +
        entries
          .map(
            ([key, part]) =>
              '  '.repeat(level + 1) + JSON.stringify(key) + ': ' + literal(part, path + '.' + key, level + 1),
          )
          .join(',\n') +
        '\n' +
        '  '.repeat(level) +
        '}'
    : '{}';
}
/** Emit CheckpointAnswer and delegate only primitive ContentBlocks. */
export function materializeCheckpointAnswer(config: CheckpointAnswerSource, context: AnswerContext): AnswerResult {
  if (
    !record(config) ||
    config.type !== 'checkpointAnswer' ||
    typeof config.slug !== 'string' ||
    !slug.test(config.slug) ||
    !uuid.test(config.id)
  ) {
    throw new Error('CheckpointAnswer: invalid identity or type');
  }
  if (!locale.test(context.documentLanguage) || !/^(?:\.\.?\/|#|@svitlo\/)/.test(context.languagesImport)) {
    throw new Error('CheckpointAnswer: missing documentLanguage/languages import');
  }
  const at = directory(context.directory);
  if (!Array.isArray(config.children) || Object.hasOwn(config, 'content')) {
    throw new Error('CheckpointAnswer: expected direct child keys and children order');
  }
  const metadata = new Set(['id', 'type', 'slug', 'params', 'locale', 'children']);
  const enabled = Object.entries(config).filter(
    (entry): entry is [string, CheckpointAnswerBlockSource] => !metadata.has(entry[0]),
  );
  if (enabled.some(([, value]) => typeof value === 'boolean'))
    throw new Error('CheckpointAnswer: disabled children cannot be authored');
  const keys = enabled.map(([key]) => key);
  if (
    !keys.length ||
    config.children.length !== keys.length ||
    new Set(config.children).size !== keys.length ||
    config.children.some(key => !keys.includes(key))
  ) {
    throw new Error('CheckpointAnswer.children: list every enabled answer exactly once');
  }
  const ids = new Set([config.id]);
  for (const [key, child] of enabled) {
    if (
      !slug.test(key) ||
      key === 'constructor' ||
      key === '__proto__' ||
      !record(child) ||
      !allowed.has(child.type) ||
      child.slug !== key ||
      !uuid.test(child.id) ||
      ids.has(child.id)
    ) {
      throw new Error('CheckpointAnswer.children.' + key + ': invalid kind, slug or duplicate UUID');
    }
    ids.add(child.id);
  }
  const files: AnswerFile[] = [];
  const diagnostics: AnswerDiagnostic[] = [];
  const imports: string[] = [];
  const claim = createSourceIdentifierRegistry('checkpointAnswer', [
    'defineCheckpointAnswer',
    'languages',
    'content',
    reserved.has(config.slug) ? 'config_' + config.slug : config.slug,
  ]);
  const items: string[] = [];
  const paths = new Set<string>();
  for (const key of config.children) {
    const child = config[key] as CheckpointAnswerBlockSource;
    const target = (at ? at + '/' : '') + key;
    const result = context.renderChild(child, target);
    if (!result || !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(result.exportName)) {
      throw new Error('CheckpointAnswer.children.' + key + ': invalid delegate export');
    }
    const name = claim(result.exportName, 'children.' + key);
    imports.push('import { ' + name + ' } from ' + JSON.stringify('./' + key) + ';');
    items.push('    ' + renderSourceItem(key, name) + ',');
    for (const file of result.files) {
      if (!file.path.startsWith(target + '/')) {
        throw new Error(
          'CheckpointAnswer.children.' + key + ': child emitted a file outside its owned directory: ' + file.path,
        );
      }
      if (paths.has(file.path) || file.path === (at ? at + '/' : '') + 'index.ts') {
        throw new Error('CheckpointAnswer: duplicate generated path ' + file.path);
      }
      paths.add(file.path);
      files.push(file);
    }
    diagnostics.push(...result.diagnostics);
  }
  const exportName = reserved.has(config.slug) ? 'config_' + config.slug : config.slug;
  const code = [
    "import { defineCheckpointAnswer } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(context.languagesImport) + ';',
    ...imports,
    '',
    'const __placements = {',
    ...items,
    '};',
    '',
    'export const ' +
      exportName +
      ' = defineCheckpointAnswer<' +
      JSON.stringify(config.slug) +
      ', typeof __placements, typeof languages>({',
    '  id: ' + JSON.stringify(config.id) + ',',
    '  slug: ' + JSON.stringify(config.slug) + ',',
    "  type: 'checkpointAnswer',",
    '  children: ' + literal(config.children, 'checkpointAnswer.children', 1) + ',',
    '  ...__placements,',
    '});',
    '',
  ].join('\n');
  files.push({ path: (at ? at + '/' : '') + 'index.ts', content: code, kind: 'typescript' });
  return { exportName, files, diagnostics };
}
