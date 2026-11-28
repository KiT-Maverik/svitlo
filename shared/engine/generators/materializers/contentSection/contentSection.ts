import type { Content_Section_Config } from '../../../configurators/sections/defineContentSection/defineContentSection.schemas';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';
import { createSourceIdentifierRegistry } from '../sourceIdentifiers.mjs';

/**
 * defineContentSection source materializer (not a Props/JSON publisher).
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
export type Source = Content_Section_Config & { children: string[] };
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
  /** Internal owner of Section editorial notes; never implies completed methodology. */
  noteOwnership?: 'course-lesson-placement';
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
      .map(key => {
        const child = value[key];
        const name = isObject(child) && reference in child ? String(child[reference]) : undefined;
        return (
          '  '.repeat(depth + 1) + (name === key ? key : JSON.stringify(key) + ': ' + render(child, depth + 1)) + ','
        );
      })
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
const sectionFields = new Set(['id', 'type', 'slug', 'params', 'locale', 'children', 'draft']);
function validateCollection(content: Source, location: string): void {
  if (!isObject(content) || !Array.isArray(content.children) || Object.hasOwn(content, 'content'))
    throw new Error(location + ': expected direct children');
  const keys = Object.keys(content).filter(key => !sectionFields.has(key));
  if (
    keys.length !== content.children.length ||
    new Set(content.children).size !== keys.length ||
    content.children.some(k => typeof k !== 'string' || !Object.hasOwn(content, k) || sectionFields.has(k))
  )
    throw new Error(location + '.children: expected every child once');
  const ids = new Set<string>();
  for (const key of keys) {
    pathPart(key, location + '.' + key);
    const child = childConfig(content[key] as SourceChild).config;
    if (!isObject(child) || child.slug !== key || typeof child.type !== 'string' || !uuid.test(child.id))
      throw new Error(location + '.' + key + ': mismatched child identity/type/UUID');
    if (ids.has(child.id)) throw new Error(location + '.' + key + ': duplicate child UUID');
    ids.add(child.id);
  }
}

/** Pure, deterministic render. No file writes or source-mutation; parent owns create-only writer. */
export function materializeContentSection(config: Source, options: Options): Result {
  const directory = options.directory ?? '';
  if (directory) for (const part of directory.split('/')) pathPart(part, 'directory');
  if (config.type !== 'content' || !uuid.test(config.id)) throw new Error('content: invalid type/UUID');
  pathPart(config.slug, 'content.slug');
  if (!localeKey.test(options.documentLanguage)) throw new Error('content: invalid documentLanguage');
  if (!/^(?:\.\.?\/|#|@)/.test(options.languagesImport)) throw new Error('content: unsafe languages import');
  validateCollection(config, 'content.content');
  const files: GeneratedFile[] = [];
  const diagnostics: Diagnostic[] = [];
  const imports: string[] = [];
  const items: Record<string, Reference> = {};
  const claim = createSourceIdentifierRegistry('contentSection', [
    'defineContentSection',
    'languages',
    'content',
    exportName(config.slug),
  ]);
  const seenFiles = new Set<string>();
  const add = (file: GeneratedFile): void => {
    outputPath(file.path);
    if (seenFiles.has(file.path)) throw new Error('content: duplicate generated path ' + file.path);
    seenFiles.add(file.path);
    files.push(file);
  };
  for (const key of [...config.children].sort()) {
    const node = childConfig(config[key] as SourceChild);
    const childDirectory = [directory, key].filter(Boolean).join('/');
    const child = options.renderContentBlock(node.config, {
      directory: childDirectory,
      documentLanguage: options.documentLanguage,
      languagesImport: childLanguagesImport(options.languagesImport, 1),
      ...(node.production ? { production: node.production } : {}),
    });
    for (const file of child.files) {
      if (!file.path.startsWith(childDirectory + '/'))
        throw new Error('content: child output escaped ownership: ' + file.path);
      add(file);
    }
    diagnostics.push(...child.diagnostics);
    const name = claim(child.exportName, 'content.items.' + key);
    items[key] = imported(name);
    imports.push('import { ' + name + ' } from ' + JSON.stringify('./' + key) + ';');
  }
  const rest = Object.fromEntries(
    Object.entries(config).filter(([key]) => sectionFields.has(key) && key !== 'children'),
  );
  const metadata = { ...rest, locale: filterLocale(rest.locale, options.documentLanguage) };
  const own = { ...metadata, children: [...config.children], ...items };
  const name = exportName(config.slug);
  const blocker: string[] = [];
  const sectionNotes = Object.keys(options.production ?? {}).filter(
    key => !['pending', 'documentLanguage', 'methodologyIntegrated'].includes(key),
  );
  if (
    sectionNotes.length &&
    options.production?.methodologyIntegrated !== true &&
    options.noteOwnership !== 'course-lesson-placement'
  )
    blocker.push(
      renderBlockerTodo(
        'Transfer reviewed content Section notes (' +
          sectionNotes.join(', ') +
          ') into the owning Lesson methodology and verify the transfer before removing this marker.',
      ),
    );
  if (options.production?.pending === true)
    blocker.push(
      renderBlockerTodo('Implement, validate and review the content Section production before removing this marker.'),
    );
  if (blocker.length)
    diagnostics.push({
      path: (directory || 'content') + '/index.ts',
      code: 'pending-content',
      message: blocker.join(' '),
      severity: 'warning',
    });
  const contentValue = items;
  const source = [
    "import { defineContentSection } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(options.languagesImport) + ';',
    ...imports,
    '',
    ...blocker,
    'const __blocks = ' + render(contentValue) + ';',
    '',
    'export const ' +
      name +
      ' = defineContentSection<' +
      JSON.stringify(config.slug) +
      ', typeof __blocks, typeof languages>(',
    render(own) + ');',
    '',
  ].join('\n');
  add({ path: [directory, 'index.ts'].filter(Boolean).join('/'), content: source, kind: 'typescript' });
  return { exportName: name, files, diagnostics };
}
