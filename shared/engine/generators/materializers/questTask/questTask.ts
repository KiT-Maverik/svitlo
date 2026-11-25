import type { Task_Config } from '../../../configurators/sections/defineQuestSection/defineTask/defineTask.schemas';
import { renderBlockerSpecification, renderBlockerTodo } from '../renderBlockerTodo.mjs';

/** Quest Task owns exactly one Scene; interactive Scene implementation belongs to its own agent. */
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
      .map(key => '  '.repeat(depth + 1) + JSON.stringify(key) + ': ' + render(value[key], depth + 1) + ',')
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
/** Preserve reviewed child intent as inert, removable TypeScript comments.
 * The owning Lesson methodology or Episode narrative must absorb durable notes
 * before specialists clear the blocker. JSON-escaping prevents comment injection.
 */
function reviewedNotes(production: Record<string, unknown> | undefined): string[] {
  const entries = Object.entries(production ?? {}).filter(([key]) => !['pending', 'documentLanguage'].includes(key));
  if (!entries.length) return [];
  return [
    renderBlockerSpecification(
      'Integrate reviewed Quest child notes into the owning methodology or narrative, verify the transfer, then remove this temporary brief.',
      entries.map(([key, value]) => 'Reviewed ' + key + ': ' + JSON.stringify(value)).join('\n'),
    ),
  ];
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

export type Source = Omit<Task_Config, 'scene'> & { scene: SourceChild };
export type Options = {
  documentLanguage: string;
  directory?: string;
  languagesImport: string;
  production?: Record<string, unknown>;
  renderScene: (
    config: ChildConfig,
    options: {
      directory: string;
      documentLanguage: string;
      languagesImport: string;
      production?: Record<string, unknown>;
    },
  ) => Result;
};
export function materializeQuestTask(config: Source, options: Options): Result {
  const dir = options.directory ?? '';
  destination(dir);
  if (config.type !== 'questTask' || !uuid.test(config.id)) throw new Error('questTask: invalid type/UUID');
  part(config.slug, 'questTask.slug');
  if (!localeKey.test(options.documentLanguage)) throw new Error('questTask: invalid documentLanguage');
  const node = sourceNode(config.scene);
  if (!isObject(node.config) || node.config.type !== 'scene' || !uuid.test(node.config.id))
    throw new Error('questTask.scene: exactly one Scene Config with UUID required');
  part(node.config.slug, 'questTask.scene.slug');
  if (node.config.id === config.id) throw new Error('questTask.scene: duplicate UUID');
  const childDir = [dir, 'scene'].filter(Boolean).join('/');
  const child = options.renderScene(node.config, {
    directory: childDir,
    documentLanguage: options.documentLanguage,
    languagesImport: childLanguagesImport(options.languagesImport, 1),
    ...(node.production ? { production: node.production } : {}),
  });
  const files: GeneratedFile[] = [],
    diagnostics: Diagnostic[] = [...child.diagnostics];
  const seen = new Set<string>();
  includeChild(files, seen, diagnostics, { ...child, diagnostics: [] }, childDir, node.config.slug);
  const blockers =
    options.production?.pending === true || node.production?.pending === true
      ? [
          renderBlockerTodo(
            'Implement, register and independently review the referenced Quest Task Scene before removing this marker.',
          ),
        ]
      : [];
  if (blockers.length)
    diagnostics.push({ path: destination(dir), code: 'pending-quest-task', message: blockers[0], severity: 'warning' });
  const source = [
    "import { defineTask } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(options.languagesImport) + ';',
    'import { ' + child.exportName + ' as child_scene } from "./scene";',
    '',
    ...blockers,
    ...reviewedNotes(options.production),
    'export const ' + exported(config.slug) + ' = defineTask<' + JSON.stringify(config.slug) + ', typeof languages>(',
    render({ id: config.id, slug: config.slug, type: config.type, scene: imported('child_scene') }) + ');',
    '',
  ].join('\n');
  const notes = reviewedNotes(options.production);
  if (notes.length)
    diagnostics.push({
      path: destination(dir),
      code: 'pending-quest-child-notes',
      severity: 'warning',
      message: 'Reviewed Quest child notes must be integrated at the owning methodology/narrative',
    });
  addOwn(files, seen, { path: destination(dir), kind: 'typescript', content: source });
  return { exportName: exported(config.slug), files, diagnostics };
}
