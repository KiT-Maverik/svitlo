import type { ContentBlock_CheckpointAnswer_Config } from '../../../configurators/contentBlocks/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import type { ContentBlock_Audio_Config } from '../../../configurators/contentBlocks/defineAudio/defineAudio.schemas';
import type { ContentBlock_Code_Config } from '../../../configurators/contentBlocks/defineCode/defineCode.schemas';
import type { ContentBlock_Image_Config } from '../../../configurators/contentBlocks/defineImage/defineImage.schemas';
import type { ContentBlock_Markdown_Config } from '../../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Scene_Config } from '../../../configurators/contentBlocks/defineScene/defineScene.schemas';
import type { ContentBlock_Subtitles_Config } from '../../../configurators/contentBlocks/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Text_Config } from '../../../configurators/contentBlocks/defineText/defineText.schemas';
import type { ContentBlock_Video_Config } from '../../../configurators/contentBlocks/defineVideo/defineVideo.schemas';
import type { ContentBlock_Youtube_Config } from '../../../configurators/contentBlocks/defineYoutube/defineYoutube.schemas';
import type { CarouselSource } from '../carousel/materializeCarousel';

export type CheckpointAnswerBlockSource =
  | ContentBlock_Audio_Config | CarouselSource | ContentBlock_Code_Config | ContentBlock_Image_Config
  | ContentBlock_Markdown_Config | ContentBlock_Scene_Config | ContentBlock_Subtitles_Config
  | ContentBlock_Text_Config | ContentBlock_Video_Config | ContentBlock_Youtube_Config;
export type CheckpointAnswerSource = Omit<ContentBlock_CheckpointAnswer_Config, 'content'> & {
  content: { items: Record<string, CheckpointAnswerBlockSource | false>; order: string[] };
};
export type AnswerFile = { path: string; content: string; kind: 'typescript' | 'specification' | 'markdown' | 'code' };
export type AnswerDiagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type AnswerResult = { exportName: string; files: AnswerFile[]; diagnostics: AnswerDiagnostic[] };
export type AnswerContext = {
  directory: string;
  documentLanguage: string;
  languagesImport: string;
  /** Direct child materializer (Text, Carousel, Scene, etc.), never a generic serializer. */
  renderChild: (config: CheckpointAnswerBlockSource, directory: string) => AnswerResult;
};
const slug = /^[a-z][a-zA-Z0-9]*$/;
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const locale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const reserved = new Set('await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static'.split(' '));
const allowed = new Set(['audio', 'carousel', 'code', 'image', 'markdown', 'scene', 'subtitles', 'text', 'video', 'youtube']);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function directory(value: string): string {
  if (value === '') return value;
  if (typeof value !== 'string' || value.startsWith('/') || value.split('/').some(part => !slug.test(part) || part === 'constructor' || part === '__proto__')) {
    throw new Error('CheckpointAnswer: unsafe destination directory ' + value);
  }
  return value;
}
function literal(value: unknown, path: string, level = 0): string {
  if (value === undefined) return 'undefined';
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map((part, i) => literal(part, path + '[' + i + ']', level + 1)).join(', ') + ']';
  if (!record(value) || Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
    throw new Error(path + ': unsupported source expression; delegate to its concrete materializer');
  }
  const entries = Object.entries(value);
  return entries.length ? '{\n' + entries.map(([key, part]) => '  '.repeat(level + 1) + JSON.stringify(key) + ': ' + literal(part, path + '.' + key, level + 1)).join(',\n') + '\n' + '  '.repeat(level) + '}' : '{}';
}
/** Emit CheckpointAnswer and delegate every allowed ContentBlock, including nested composites. */
export function materializeCheckpointAnswer(config: CheckpointAnswerSource, context: AnswerContext): AnswerResult {
  if (!record(config) || config.type !== 'checkpointAnswer' || typeof config.slug !== 'string' ||
    !slug.test(config.slug) || !uuid.test(config.id)) {
    throw new Error('CheckpointAnswer: invalid identity or type');
  }
  if (!locale.test(context.documentLanguage) || !/^(?:\.\.?\/|#|@svitlo\/)/.test(context.languagesImport)) {
    throw new Error('CheckpointAnswer: missing documentLanguage/languages import');
  }
  const at = directory(context.directory);
  if (!record(config.content) || !record(config.content.items) || !Array.isArray(config.content.order)) {
    throw new Error('CheckpointAnswer.content: expected { items, order }');
  }
  const enabled = Object.entries(config.content.items).filter((entry): entry is [string, CheckpointAnswerBlockSource] => entry[1] !== false);
  const keys = enabled.map(([key]) => key);
  if (!keys.length || config.content.order.length !== keys.length || new Set(config.content.order).size !== keys.length ||
    config.content.order.some(key => !keys.includes(key))) {
    throw new Error('CheckpointAnswer.content.order: list every enabled answer exactly once');
  }
  const ids = new Set([config.id]);
  for (const [key, child] of enabled) {
    if (!slug.test(key) || key === 'constructor' || key === '__proto__' || !record(child) ||
      !allowed.has(child.type) || child.slug !== key || !uuid.test(child.id) || ids.has(child.id)) {
      throw new Error('CheckpointAnswer.content.items.' + key + ': invalid kind, slug or duplicate UUID');
    }
    ids.add(child.id);
  }
  const files: AnswerFile[] = [];
  const diagnostics: AnswerDiagnostic[] = [];
  const imports: string[] = [];
  const items: string[] = [];
  const paths = new Set<string>();
  for (const key of config.content.order) {
    const child = config.content.items[key];
    if (child === false) continue;
    const target = (at ? at + '/' : '') + 'content/items/' + key;
    const result = context.renderChild(child, target);
    if (!result || !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(result.exportName)) {
      throw new Error('CheckpointAnswer.content.items.' + key + ': invalid delegate export');
    }
    const alias = 'answer_' + key;
    imports.push('import { ' + result.exportName + ' as ' + alias + ' } from ' + JSON.stringify('./content/items/' + key) + ';');
    items.push('    ' + JSON.stringify(key) + ': ' + alias + ',');
    for (const file of result.files) {
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
    ...imports, '',
    'const content = {',
    '  items: {', ...items, '  },',
    '  order: ' + literal(config.content.order, 'checkpointAnswer.content.order', 1) + ',',
    '};', '',
    'export const ' + exportName + ' = defineCheckpointAnswer<' + JSON.stringify(config.slug) + ', typeof content.items, typeof languages>({',
    '  id: ' + JSON.stringify(config.id) + ',',
    '  slug: ' + JSON.stringify(config.slug) + ',',
    "  type: 'checkpointAnswer',",
    '  content,',
    '});', '',
  ].join('\n');
  files.push({ path: (at ? at + '/' : '') + 'index.ts', content: code, kind: 'typescript' });
  return { exportName, files, diagnostics };
}
