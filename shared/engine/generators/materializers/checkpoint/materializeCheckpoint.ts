import type { ContentBlock_Checkpoint_Config } from '../../../configurators/contentBlocks/composite/defineCheckpoint/defineCheckpoint.schemas';
import type { CheckpointItemSource } from '../checkpointItem/materializeCheckpointItem';
import { createSourceIdentifierRegistry, renderSourceItem } from '../sourceIdentifiers.mjs';

export type CheckpointSource = ContentBlock_Checkpoint_Config & { children: string[] };
export type CheckpointFile = {
  path: string;
  content: string;
  kind: 'typescript' | 'specification' | 'markdown' | 'code';
};
export type CheckpointDiagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type CheckpointResult = { exportName: string; files: CheckpointFile[]; diagnostics: CheckpointDiagnostic[] };
export type CheckpointContext = {
  directory: string;
  documentLanguage: string;
  languagesImport: string;
  renderItem: (config: CheckpointItemSource, directory: string) => CheckpointResult;
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
    value.split('/').some(x => !slug.test(x) || x === 'constructor' || x === '__proto__')
  ) {
    throw new Error('Checkpoint: unsafe source directory ' + value);
  }
  return value;
}
function localized(value: unknown, language: string, at: string): unknown {
  if (Array.isArray(value)) throw new Error(at + ': authored locale must use keyed objects');
  if (!record(value)) return value;
  const entries = Object.entries(value);
  if (entries.length && entries.every(([k]) => locale.test(k))) {
    if (!Object.hasOwn(value, language)) throw new Error(at + ': missing source language ' + language);
    return { [language]: localized(value[language], language, at + '.' + language) };
  }
  return Object.fromEntries(entries.map(([key, part]) => [key, localized(part, language, at + '.' + key)]));
}
function literal(value: unknown, at: string, level = 0): string {
  if (value === undefined) return 'undefined';
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value))
    return '[' + value.map((part, i) => literal(part, at + '[' + i + ']', level + 1)).join(', ') + ']';
  if (!record(value) || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) {
    throw new Error(at + ': non-plain source cannot be serialized');
  }
  const entries = Object.entries(value);
  return entries.length
    ? '{\n' +
        entries
          .map(
            ([key, v]) => '  '.repeat(level + 1) + JSON.stringify(key) + ': ' + literal(v, at + '.' + key, level + 1),
          )
          .join(',\n') +
        '\n' +
        '  '.repeat(level) +
        '}'
    : '{}';
}
/** Emit the Checkpoint only: its items are delegated to CheckpointItem. */
export function materializeCheckpoint(config: CheckpointSource, context: CheckpointContext): CheckpointResult {
  if (
    !record(config) ||
    config.type !== 'checkpoint' ||
    typeof config.slug !== 'string' ||
    !slug.test(config.slug) ||
    !uuid.test(config.id)
  )
    throw new Error('Checkpoint: invalid identity or type');
  if (!locale.test(context.documentLanguage) || !/^(?:\.\.?\/|#|@svitlo\/)/.test(context.languagesImport)) {
    throw new Error('Checkpoint: documentLanguage and languages import are required');
  }
  const directory = safeDirectory(context.directory);
  if (!Array.isArray(config.children) || Object.hasOwn(config, 'content')) {
    throw new Error('Checkpoint: expected direct child keys and children order');
  }
  const metadata = new Set(['id', 'type', 'slug', 'params', 'locale', 'children']);
  const enabled = Object.entries(config).filter(
    (entry): entry is [string, CheckpointItemSource] => !metadata.has(entry[0]),
  );
  if (enabled.some(([, value]) => typeof value === 'boolean')) throw new Error('Checkpoint: disabled children cannot be authored');
  const keys = enabled.map(([key]) => key);
  if (
    !keys.length ||
    config.children.length !== keys.length ||
    new Set(config.children).size !== keys.length ||
    config.children.some(key => !keys.includes(key))
  ) {
    throw new Error('Checkpoint.children: list each enabled CheckpointItem exactly once');
  }
  const ids = new Set<string>([config.id]);
  for (const [key, item] of enabled) {
    if (
      !slug.test(key) ||
      key === 'constructor' ||
      key === '__proto__' ||
      !record(item) ||
      item.type !== 'checkpointItem' ||
      item.slug !== key ||
      !uuid.test(item.id) ||
      ids.has(item.id)
    ) {
      throw new Error('Checkpoint.children.' + key + ': invalid kind, slug or duplicate UUID');
    }
    ids.add(item.id);
  }
  const files: CheckpointFile[] = [];
  const diagnostics: CheckpointDiagnostic[] = [];
  const imports: string[] = [];
  const claim = createSourceIdentifierRegistry('checkpoint', [
    'defineCheckpoint',
    'languages',
    'content',
    reserved.has(config.slug) ? 'config_' + config.slug : config.slug,
  ]);
  const entries: string[] = [];
  const paths = new Set<string>();
  for (const key of config.children) {
    const child = config[key] as CheckpointItemSource;
    const target = (directory ? directory + '/' : '') + key;
    const result = context.renderItem(child, target);
    if (!result || !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(result.exportName)) {
      throw new Error('Checkpoint.children.' + key + ': child materializer returned invalid export');
    }
    const name = claim(result.exportName, 'children.' + key);
    imports.push('import { ' + name + ' } from ' + JSON.stringify('./' + key) + ';');
    entries.push('    ' + renderSourceItem(key, name) + ',');
    for (const f of result.files) {
      if (!f.path.startsWith(target + '/')) {
        throw new Error(
          'Checkpoint.children.' + key + ': child emitted a file outside its owned directory: ' + f.path,
        );
      }
      if (paths.has(f.path) || f.path === (directory ? directory + '/' : '') + 'index.ts') {
        throw new Error('Checkpoint: duplicate output path ' + f.path);
      }
      paths.add(f.path);
      files.push(f);
    }
    diagnostics.push(...result.diagnostics);
  }
  const source = { ...config, locale: localized(config.locale, context.documentLanguage, 'checkpoint.locale') };
  const fields = Object.entries(source)
    .filter(([key]) => metadata.has(key) && key !== 'children')
    .map(([key, value]) => '  ' + JSON.stringify(key) + ': ' + literal(value, 'checkpoint.' + key, 1) + ',');
  const exportName = reserved.has(config.slug) ? 'config_' + config.slug : config.slug;
  const code = [
    "import { defineCheckpoint } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(context.languagesImport) + ';',
    ...imports,
    '',
    'const __placements = {',
    ...entries,
    '};',
    '',
    'export const ' +
      exportName +
      ' = defineCheckpoint<' +
      JSON.stringify(config.slug) +
      ', typeof __placements, typeof languages>({',
    ...fields,
    '  children: ' + literal(config.children, 'checkpoint.children', 1) + ',',
    '  ...__placements,',
    '});',
    '',
  ].join('\n');
  files.push({ path: (directory ? directory + '/' : '') + 'index.ts', content: code, kind: 'typescript' });
  return { exportName, files, diagnostics };
}
