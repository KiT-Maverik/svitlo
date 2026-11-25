import { createSourceIdentifierRegistry } from '../sourceIdentifiers.mjs';
import type { QuestSection_Config } from '../../../configurators/sections/defineQuestSection/defineQuestSection.schemas';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';

/** Build-only Quest source. No false Lesson/Episode runtime or Stage playback support. */
/**
 * Keep the exact Lesson/Episode constants.ts reference when child files live
 * deeper than their parent. Package aliases remain rooted independently.
 */
function childLanguagesImport(parentImport: string, nestedDepth: number): string {
  if (parentImport.startsWith('#') || parentImport.startsWith('@')) return parentImport;
  if (!/^(?:\.\/|\.\.\/)/.test(parentImport)) throw new Error('Unsafe languages import: ' + parentImport);
  return '../'.repeat(nestedDepth) + parentImport.replace(/^\.\//, '');
}
export type ChildConfig = { id: string; slug: string; type: string; [key: string]: unknown };
export type SourceChild = ChildConfig | { config: ChildConfig; production?: Record<string, unknown> };
export type GeneratedFile = {
  path: string;
  content: string;
  kind: 'typescript' | 'specification' | 'markdown' | 'code';
};
export type Diagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type Result = { exportName: string; files: GeneratedFile[]; diagnostics: Diagnostic[] };
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
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
  'stages',
  'tasks',
]);
const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
const reference = Symbol('authored TS import');
type Reference = { [reference]: string };
const imported = (name: string): Reference => ({ [reference]: name });
const sourceNode = (value: SourceChild): { config: ChildConfig; production?: Record<string, unknown> } =>
  isObject(value) && isObject(value.config)
    ? { config: value.config as ChildConfig, ...(isObject(value.production) ? { production: value.production } : {}) }
    : { config: value as ChildConfig };
const part = (value: string, location: string): void => {
  if (typeof value !== 'string' || !slug.test(value) || value === '__proto__' || value === 'constructor')
    throw new Error(location + ': unsafe or missing camelCase slug');
};
const destination = (dir: string, name = 'index.ts'): string => {
  if (dir) for (const component of dir.split('/')) part(component, 'output path');
  return [dir, name].filter(Boolean).join('/');
};
const exported = (name: string): string => (reserved.has(name) ? 'config_' + name : name);
function render(value: unknown, depth = 0): string {
  if (isObject(value) && reference in value) return String(value[reference]);
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
    return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(item => render(item, depth + 1)).join(', ') + ']';
  if (!isObject(value)) throw new Error('Unsupported authored JS value');
  const entries = Object.keys(value);
  if (!entries.length) return '{}';
  return (
    '{\n' +
    entries
      .map(key => {
        const child = value[key];
        const name = isObject(child) && reference in child ? String(child[reference]) : undefined;
        return '  '.repeat(depth + 1) + (name === key ? key : JSON.stringify(key) + ': ' + render(child, depth + 1)) + ',';
      })
      .join('\n') +
    '\n' +
    '  '.repeat(depth) +
    '}'
  );
}
function filterLocale(value: unknown, source: string): unknown {
  if (Array.isArray(value)) return value.map(child => filterLocale(child, source));
  if (!isObject(value)) return value;
  const keys = Object.keys(value);
  if (keys.length && keys.every(key => localeKey.test(key)))
    return Object.hasOwn(value, source) ? { [source]: filterLocale(value[source], source) } : {};
  return Object.fromEntries(keys.map(key => [key, filterLocale(value[key], source)]));
}
function verifyChild(
  node: SourceChild,
  expected: string,
  key: string,
): { config: ChildConfig; production?: Record<string, unknown> } {
  const resolved = sourceNode(node);
  if (
    !isObject(resolved.config) ||
    resolved.config.type !== expected ||
    !uuid.test(resolved.config.id) ||
    resolved.config.slug !== key
  )
    throw new Error(key + ': invalid ' + expected + ' child identity/type/UUID');
  return resolved;
}
function includeChild(
  target: GeneratedFile[],
  seen: Set<string>,
  diagnostics: Diagnostic[],
  child: Result,
  dir: string,
  key: string,
): void {
  if (child.exportName !== exported(key)) throw new Error(dir + ': mismatched child export');
  for (const file of child.files) {
    if (!file.path.startsWith(dir + '/')) throw new Error(dir + ': child escaped its output directory');
    if (seen.has(file.path)) throw new Error(dir + ': duplicate output ' + file.path);
    seen.add(file.path);
    target.push(file);
  }
  diagnostics.push(...child.diagnostics);
}
function addOwn(files: GeneratedFile[], seen: Set<string>, file: GeneratedFile): void {
  if (seen.has(file.path)) throw new Error('duplicate output ' + file.path);
  seen.add(file.path);
  files.push(file);
}

export type Source = Omit<QuestSection_Config, 'stages' | 'tasks'> & {
  stages: Record<string, SourceChild>;
  tasks: Record<string, SourceChild>;
};
export type Options = {
  documentLanguage: string;
  directory?: string;
  languagesImport: string;
  production?: Record<string, unknown>;
  renderStage: (
    config: ChildConfig,
    options: {
      directory: string;
      documentLanguage: string;
      languagesImport: string;
      production?: Record<string, unknown>;
    },
  ) => Result;
  renderTask: (
    config: ChildConfig,
    options: {
      directory: string;
      documentLanguage: string;
      languagesImport: string;
      production?: Record<string, unknown>;
    },
  ) => Result;
};
export function materializeQuestSection(config: Source, options: Options): Result {
  const dir = options.directory ?? '';
  destination(dir);
  if (config.type !== 'quest' || !uuid.test(config.id)) throw new Error('quest: invalid type/UUID');
  part(config.slug, 'quest.slug');
  if (!localeKey.test(options.documentLanguage)) throw new Error('quest: invalid documentLanguage');
  const files: GeneratedFile[] = [],
    diagnostics: Diagnostic[] = [];
  const seen = new Set<string>();
  const values: Record<string, unknown> = {};
  // Both Quest maps require "start". Independent modules preserve canonical
  // child names without aliases or a collision between the two maps.
  const mapImports: Record<'stages' | 'tasks', string[]> = { stages: [], tasks: [] };
  createSourceIdentifierRegistry('questSection', ['defineQuestSection', 'languages', 'stages', 'tasks', exported(config.slug)]);
  const identities = new Set<string>([config.id]);
  for (const category of ['stages', 'tasks'] as const) {
    const source = config[category];
    if (!isObject(source) || !Object.hasOwn(source, 'start'))
      throw new Error('quest.' + category + ': mandatory start child missing');
    if (Object.hasOwn(source, 'order'))
      throw new Error('quest.' + category + ': order is prohibited; Quest branches via Actions');
    const rendered: Record<string, Reference> = {};
    const claim = createSourceIdentifierRegistry('questSection ' + category, [category]);
    const ids = new Set<string>();
    for (const key of Object.keys(source).sort()) {
      part(key, 'quest.' + category + '.' + key);
      const raw = verifyChild(source[key], category === 'stages' ? 'questStage' : 'questTask', key);
      if (ids.has(raw.config.id)) throw new Error('quest.' + category + ': duplicate UUID ' + raw.config.id);
      ids.add(raw.config.id);
      if (identities.has(raw.config.id)) throw new Error('quest: UUID reused across stages/tasks: ' + raw.config.id);
      identities.add(raw.config.id);
      const childDir = [dir, category, key].filter(Boolean).join('/');
      const child = (category === 'stages' ? options.renderStage : options.renderTask)(raw.config, {
        directory: childDir,
        documentLanguage: options.documentLanguage,
        languagesImport: childLanguagesImport(options.languagesImport, 2),
        ...(raw.production ? { production: raw.production } : {}),
      });
      includeChild(files, seen, diagnostics, child, childDir, key);
      const name = claim(child.exportName, category + '.' + key);
      rendered[key] = imported(name);
      mapImports[category].push('import { ' + name + ' } from ' + JSON.stringify('./' + category + '/' + key) + ';');
    }
    values[category] = rendered;
  }
  for (const category of ['stages', 'tasks'] as const) {
    addOwn(files, seen, {
      path: destination(dir, category + '.ts'),
      kind: 'typescript',
      content: [...mapImports[category], '', 'export const ' + category + ' = ' + render(values[category]) + ';', ''].join('\n'),
    });
  }
  const { stages: _ignoredStages, tasks: _ignoredTasks, ...metadata } = config;
  const own = {
    ...metadata,
    locale: filterLocale(metadata.locale, options.documentLanguage),
    stages: imported('stages'),
    tasks: imported('tasks'),
  };
  const blocker = renderBlockerTodo(
    'Implement and test Quest Section runtime/playback in Lesson and Episode or remove it from publication after review; current support is Build-only.',
  );
  const sectionNotes = Object.keys(options.production ?? {}).filter(
    key => !['pending', 'documentLanguage', 'methodologyIntegrated'].includes(key),
  );
  const methodologyBlocker =
    sectionNotes.length && options.production?.methodologyIntegrated !== true
      ? renderBlockerTodo(
          'Transfer reviewed Quest Section notes (' +
            sectionNotes.join(', ') +
            ') into Lesson methodology; verify the transfer before removing this marker.',
        )
      : undefined;
  if (methodologyBlocker)
    diagnostics.push({
      path: destination(dir),
      code: 'pending-quest-methodology',
      message: methodologyBlocker,
      severity: 'warning',
    });
  diagnostics.push({ path: destination(dir), code: 'quest-build-only', message: blocker, severity: 'warning' });
  const source = [
    "import { defineQuestSection } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(options.languagesImport) + ';',
    'import { stages } from "./stages";',
    'import { tasks } from "./tasks";',
    '',
    blocker,
    ...(methodologyBlocker ? [methodologyBlocker] : []),
    'export const ' +
      exported(config.slug) +
      ' = defineQuestSection<' +
      JSON.stringify(config.slug) +
      ', typeof stages, typeof tasks, typeof languages>(',
    render(own) + ');',
    '',
  ].join('\n');
  addOwn(files, seen, { path: destination(dir), kind: 'typescript', content: source });
  return { exportName: exported(config.slug), files, diagnostics };
}
