import type { CodingTaskSection_Config } from '../../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';

/**
 * defineCodingTaskSection source materializer (not a Props/JSON publisher).
 * A child owns its subtree; this Section owns only content.items/order insertion.
 * Caller resolves Config-shaped child source into the owning ContentBlock materializer.
 */
/**
 * Keep the exact Lesson/Episode languages.ts reference when child files live
 * deeper than their parent. Package aliases remain rooted independently.
 */
function childLanguagesImport(parentImport: string, nestedDepth: number): string {
  if (parentImport.startsWith('#') || parentImport.startsWith('@')) return parentImport;
  if (!/^(?:\.\/|\.\.\/)/.test(parentImport)) throw new Error('Unsafe languages import: ' + parentImport);
  return '../'.repeat(nestedDepth) + parentImport.replace(/^\.\//, '');
}
export type ChildConfig = { id: string; slug: string; type: string; [key: string]: unknown };
export type SourceChild = ChildConfig | { config: ChildConfig; production?: Record<string, unknown> };
export type Source = Omit<CodingTaskSection_Config, 'content'> & {
  content: { items: Record<string, SourceChild>; order: string[] };
};
export type GeneratedFile = {
  path: string;
  content: string;
  kind: 'typescript' | 'specification' | 'markdown' | 'code';
};
export type Diagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type Result = { exportName: string; files: GeneratedFile[]; diagnostics: Diagnostic[] };
export type Options = {
  documentLanguage: string;
  directory?: string;
  languagesImport: string;
  production?: Record<string, unknown>;
  renderContentBlock: (
    config: ChildConfig,
    options: {
      directory: string;
      documentLanguage: string;
      languagesImport: string;
      production?: Record<string, unknown>;
    },
  ) => Result;
};
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slug = /^[a-zA-Z][a-zA-Z0-9]*$/;
const localeKey = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const reserved = new Set([
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
  'languages',
  'content',
  'section',
]);
const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
const reference = Symbol('materialized import');
type Reference = { [reference]: string };
const imported = (name: string): Reference => ({ [reference]: name });
const childConfig = (value: SourceChild): { config: ChildConfig; production?: Record<string, unknown> } => {
  if (isObject(value) && isObject(value.config)) {
    const { config, production } = value;
    return { config: config as ChildConfig, ...(isObject(production) ? { production } : {}) };
  }
  return { config: value as ChildConfig };
};
function render(value: unknown, depth = 0): string {
  if (isObject(value) && reference in value) return String(value[reference]);
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
    return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(item => render(item, depth + 1)).join(', ') + ']';
  if (!isObject(value)) throw new Error('Unsupported non-JSON authoring value');
  const keys = Object.keys(value);
  if (!keys.length) return '{}';
  return (
    '{\n' +
    keys
      .map(key => '  '.repeat(depth + 1) + JSON.stringify(key) + ': ' + render(value[key], depth + 1) + ',')
      .join('\n') +
    '\n' +
    '  '.repeat(depth) +
    '}'
  );
}
function filterLocale(value: unknown, source: string): unknown {
  if (Array.isArray(value)) return value.map(v => filterLocale(v, source));
  if (!isObject(value)) return value;
  const keys = Object.keys(value);
  if (keys.length && keys.every(k => localeKey.test(k))) {
    return Object.hasOwn(value, source) ? { [source]: filterLocale(value[source], source) } : {};
  }
  return Object.fromEntries(keys.map(key => [key, filterLocale(value[key], source)]));
}
const pathPart = (value: string, at: string): void => {
  if (!slug.test(value) || value === '__proto__' || value === 'constructor')
    throw new Error(at + ': unsafe or missing camelCase slug');
};
const outputPath = (value: string): string => {
  if (!value || value.startsWith('/') || value.split('/').some(part => !part || part === '.' || part === '..'))
    throw new Error('Unsafe generated destination: ' + value);
  return value;
};
const exportName = (value: string) => (reserved.has(value) ? 'config_' + value : value);
function validateCollection(content: Source['content'], location: string): void {
  if (!isObject(content) || !isObject(content.items) || !Array.isArray(content.order))
    throw new Error(location + ': expected { items, order }');
  const keys = Object.keys(content.items);
  if (
    keys.length !== content.order.length ||
    new Set(content.order).size !== keys.length ||
    content.order.some(k => typeof k !== 'string' || !Object.hasOwn(content.items, k))
  )
    throw new Error(location + '.order: expected every item key exactly once');
  const ids = new Set<string>();
  for (const key of keys) {
    pathPart(key, location + '.items.' + key);
    const child = childConfig(content.items[key]).config;
    if (!isObject(child) || child.slug !== key || typeof child.type !== 'string' || !uuid.test(child.id))
      throw new Error(location + '.items.' + key + ': mismatched child identity/type/UUID');
    if (ids.has(child.id)) throw new Error(location + '.items.' + key + ': duplicate child UUID ' + child.id);
    ids.add(child.id);
  }
}

/** Pure, deterministic render. No file writes or source-mutation; parent owns create-only writer. */
export function materializeCodingTaskSection(config: Source, options: Options): Result {
  const directory = options.directory ?? '';
  if (directory) for (const part of directory.split('/')) pathPart(part, 'directory');
  if (config.type !== 'codingTask' || !uuid.test(config.id)) throw new Error('codingTask: invalid type/UUID');
  pathPart(config.slug, 'codingTask.slug');
  if (!localeKey.test(options.documentLanguage)) throw new Error('codingTask: invalid documentLanguage');
  if (!/^(?:\.\.?\/|#|@)/.test(options.languagesImport)) throw new Error('codingTask: unsafe languages import');
  validateCollection(config.content, 'codingTask.content');
  const files: GeneratedFile[] = [];
  const diagnostics: Diagnostic[] = [];
  const imports: string[] = [];
  const items: Record<string, Reference> = {};
  const seenFiles = new Set<string>();
  const add = (file: GeneratedFile): void => {
    outputPath(file.path);
    if (seenFiles.has(file.path)) throw new Error('codingTask: duplicate generated path ' + file.path);
    seenFiles.add(file.path);
    files.push(file);
  };
  for (const key of Object.keys(config.content.items).sort()) {
    const node = childConfig(config.content.items[key]);
    const childDirectory = [directory, key].filter(Boolean).join('/');
    const child = options.renderContentBlock(node.config, {
      directory: childDirectory,
      documentLanguage: options.documentLanguage,
      languagesImport: childLanguagesImport(options.languagesImport, 1),
      ...(node.production ? { production: node.production } : {}),
    });
    if (child.exportName !== exportName(key))
      throw new Error('codingTask.content.items.' + key + ': incorrect child export');
    for (const file of child.files) {
      if (!file.path.startsWith(childDirectory + '/'))
        throw new Error('codingTask: child output escaped ownership: ' + file.path);
      add(file);
    }
    diagnostics.push(...child.diagnostics);
    const alias = 'child_content_items_' + key;
    items[key] = imported(alias);
    imports.push('import { ' + child.exportName + ' as ' + alias + ' } from ' + JSON.stringify('./' + key) + ';');
  }
  const { content: _ignored, ...rest } = config;
  const metadata = { ...rest, locale: filterLocale(rest.locale, options.documentLanguage) };
  const own = { ...metadata, content: imported('content') };
  const name = exportName(config.slug);
  const blocker: string[] = [];
  const sectionNotes = Object.keys(options.production ?? {}).filter(
    key => !['pending', 'documentLanguage', 'methodologyIntegrated'].includes(key),
  );
  if (sectionNotes.length && options.production?.methodologyIntegrated !== true)
    blocker.push(
      renderBlockerTodo(
        'Transfer reviewed codingTask Section notes (' + sectionNotes.join(', ') +
          ') into the owning Lesson methodology; remove this marker after verifying the transfer.',
      ),
    );
  if (options.production?.pending === true)
    blocker.push(renderBlockerTodo('Implement and review the codingTask Section production, verify usable runtime interactions, then remove this marker.'));
  if (blocker.length)
    diagnostics.push({
      path: (directory || 'codingTask') + '/index.ts',
      code: 'pending-codingTask',
      message: blocker.join(' '),
      severity: 'warning',
    });
  const contentValue = { items, order: [...config.content.order] };
  const source = [
    "import { defineCodingTaskSection } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(options.languagesImport) + ';',
    ...imports,
    '',
    ...blocker,
    'const content = ' + render(contentValue) + ';',
    '',
    'export const ' +
      name +
      ' = defineCodingTaskSection<' +
      JSON.stringify(config.slug) +
      ', typeof content.items, typeof languages>(',
    render(own) + ');',
    '',
  ].join('\n');
  add({ path: [directory, 'index.ts'].filter(Boolean).join('/'), content: source, kind: 'typescript' });
  return { exportName: name, files, diagnostics };
}
