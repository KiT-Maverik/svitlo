import type { Stage_Config } from '../../../configurators/sections/defineQuestSection/defineStage/defineStage.schemas';

/** Quest Stage source: media children own their own files, never fabricated URLs. */
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
function specification(production: Record<string, unknown> | undefined, omit: string[] = []): string | undefined {
  const entries = Object.entries(production ?? {}).filter(
    ([key]) => !['pending', 'documentLanguage', ...omit].includes(key),
  );
  return entries.length
    ? entries
        .map(
          ([key, value]) =>
            '# ' + key + '\n\n' + (typeof value === 'string' ? value.trimEnd() : JSON.stringify(value, null, 2)),
        )
        .join('\n\n') + '\n'
    : undefined;
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

export type Source = Omit<Stage_Config, 'content'> & {
  content: {
    video: { medium: SourceChild; small: SourceChild };
    audio: { dialogue: SourceChild | null; narration: SourceChild | null; background: SourceChild | null };
    image: SourceChild;
    subtitles: SourceChild;
  };
};
export type Options = {
  documentLanguage: string;
  directory?: string;
  languagesImport: string;
  production?: Record<string, unknown>;
  renderMedia: (
    config: ChildConfig,
    options: {
      directory: string;
      documentLanguage: string;
      languagesImport: string;
      production?: Record<string, unknown>;
    },
  ) => Result;
};
export function materializeQuestStage(config: Source, options: Options): Result {
  const dir = options.directory ?? '';
  destination(dir);
  if (config.type !== 'questStage' || !uuid.test(config.id)) throw new Error('questStage: invalid type/UUID');
  part(config.slug, 'questStage.slug');
  if (!localeKey.test(options.documentLanguage)) throw new Error('questStage: invalid documentLanguage');
  const files: GeneratedFile[] = [],
    diagnostics: Diagnostic[] = [];
  const seen = new Set<string>(),
    imports: string[] = [];
  if (!isObject(config.content) || !isObject(config.content.video) || !isObject(config.content.audio))
    throw new Error('questStage.content: video and audio records required');
  const mediaIds = new Set<string>([config.id]);
  const typePaths: Array<{ path: string[]; expected: string; source: SourceChild | null }> = [
    { path: ['video', 'medium'], expected: 'video', source: config.content.video.medium },
    { path: ['video', 'small'], expected: 'video', source: config.content.video.small },
    { path: ['audio', 'dialogue'], expected: 'audio', source: config.content.audio.dialogue },
    { path: ['audio', 'narration'], expected: 'audio', source: config.content.audio.narration },
    { path: ['audio', 'background'], expected: 'audio', source: config.content.audio.background },
    { path: ['image'], expected: 'image', source: config.content.image },
    { path: ['subtitles'], expected: 'subtitles', source: config.content.subtitles },
  ];
  const content: Record<string, unknown> = { video: {}, audio: {} };
  const video = content.video as Record<string, unknown>,
    audio = content.audio as Record<string, unknown>;
  for (const entry of typePaths) {
    const [head, leaf] = entry.path;
    const slot = entry.path.join('_');
    const node = entry.source;
    if (node === null && head === 'audio') {
      audio[leaf] = null;
      continue;
    }
    if (!node) throw new Error('questStage.content.' + entry.path.join('.') + ': mandatory media is missing');
    const raw = sourceNode(node);
    if (!isObject(raw.config) || raw.config.type !== entry.expected || !uuid.test(raw.config.id))
      throw new Error(
        'questStage.content.' + entry.path.join('.') + ': invalid expected ' + entry.expected + ' Config',
      );
    part(raw.config.slug, 'questStage.content.' + slot + '.slug');
    if (mediaIds.has(raw.config.id)) throw new Error('questStage.content.' + slot + ': duplicate UUID');
    mediaIds.add(raw.config.id);
    const childDir = [dir, 'content', ...entry.path].filter(Boolean).join('/');
    const result = options.renderMedia(raw.config, {
      directory: childDir,
      documentLanguage: options.documentLanguage,
      languagesImport: childLanguagesImport(options.languagesImport, 1 + entry.path.length),
      ...(raw.production ? { production: raw.production } : {}),
    });
    includeChild(files, seen, diagnostics, result, childDir, raw.config.slug);
    const alias = 'child_content_' + slot;
    imports.push(
      'import { ' +
        result.exportName +
        ' as ' +
        alias +
        ' } from ' +
        JSON.stringify('./content/' + entry.path.join('/')) +
        ';',
    );
    if (head === 'video') video[leaf] = imported(alias);
    else if (head === 'audio') audio[leaf] = imported(alias);
    else content[head] = imported(alias);
  }
  const own: Record<string, unknown> = {
    id: config.id,
    slug: config.slug,
    type: config.type,
    content: imported('content'),
  };
  const blockers: string[] = [];
  if (options.production?.pending === true)
    blockers.push(
      '// TODO (BLOCKER): Complete and approve Quest Stage media, accessibility alternatives and caption timings.',
    );
  if (blockers.length)
    diagnostics.push({
      path: destination(dir),
      code: 'pending-quest-stage',
      message: blockers.join(' '),
      severity: 'warning',
    });
  const source = [
    "import { defineStage } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(options.languagesImport) + ';',
    ...imports,
    '',
    ...blockers,
    'const content = ' + render(content) + ';',
    'export const ' + exported(config.slug) + ' = defineStage<' + JSON.stringify(config.slug) + ', typeof languages>(',
    render(own) + ');',
    '',
  ].join('\n');
  const spec = specification(options.production);
  if (spec) addOwn(files, seen, { path: destination(dir, 'specification.md'), kind: 'specification', content: spec });
  addOwn(files, seen, { path: destination(dir), kind: 'typescript', content: source });
  return { exportName: exported(config.slug), files, diagnostics };
}
