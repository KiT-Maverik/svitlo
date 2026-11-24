/**
 * Concrete Image source materializer. Returns a deterministic create-only
 * *plan*: parent #775 owns path joining, preflight, symlink checks and writes.
 * This is not a Props/JSON publisher, and never executes the YAML builder.
 */
import { isDeepStrictEqual } from 'node:util';

import { image_Config_Schema, type ContentBlock_Image_Config } from '../../../configurators/contentBlocks/defineImage';
import { UNRESOLVED_RESOURCE_UUID } from '../../../schemas/media.schemas';

import { renderTemporaryMediaSpecification } from '../renderTemporaryMediaSpecification';

export type ImageDraftConfig = Pick<ContentBlock_Image_Config, 'id' | 'slug' | 'type'> & {
  params?: Partial<ContentBlock_Image_Config['params']>;
  locale?: Partial<ContentBlock_Image_Config['locale']>;
};

export interface ImageMaterializationOptions {
  documentLanguage: string;
  plannedLanguages?: readonly string[];
  /** Relative module specifier for the parent-owned source-only languages.ts. */
  languagesImport?: string;
  /** Node directory, relative to the enclosing authored entity root. */
  directory?: string;
  /** Authoring-only notes, never passed to the final defineImage call. */
  production?: Readonly<Record<string, unknown>>;
}

type SourceFile = { path: string; content: string; kind: 'typescript' | 'markdown' | 'code' | 'specification' };
type Diagnostic = { path: string; code: string; message: string; severity: 'warning' };
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const languagePattern = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const slugPattern = /^[A-Za-z][A-Za-z0-9]*$/;
const uuidPattern = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const nilUuid = UNRESOLVED_RESOURCE_UUID;
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
  'content',
  'section',
  'languages',
]);

/** Locale-keyed dictionaries are the only dictionaries eligible for pruning. */
function sourceOnly(value: unknown, language: string, path: string): unknown {
  if (Array.isArray(value)) return value.map((item, index) => sourceOnly(item, language, path + '[' + index + ']'));
  if (!isRecord(value)) return value;
  const keys = Object.keys(value);
  if (keys.some(key => languagePattern.test(key))) {
    if (!keys.every(key => languagePattern.test(key))) throw new Error(path + ': mixed locale and non-locale keys');
    return Object.hasOwn(value, language)
      ? { [language]: sourceOnly(value[language], language, path + '.' + language) }
      : {};
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, sourceOnly(item, language, path + '.' + key)]),
  );
}

/** Render authored values as TS, treating only explicit reader paths as expressions. */
function printValue(value: unknown, expressions: Readonly<Record<string, string>>, path = ''): string {
  if (Object.hasOwn(expressions, path)) return expressions[path];
  if (Array.isArray(value))
    return '[' + value.map((item, index) => printValue(item, expressions, path + '[' + index + ']')).join(', ') + ']';
  if (isRecord(value)) {
    const entries = Object.entries(value).filter(([, item]) => item !== undefined);
    return entries.length
      ? '{\n' +
          entries
            .map(
              ([key, item]) =>
                '  ' + JSON.stringify(key) + ': ' + printValue(item, expressions, path ? path + '.' + key : key),
            )
            .join(',\n') +
          '\n}'
      : '{}';
  }
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
  )
    return JSON.stringify(value);
  throw new Error('$.config.' + path + ': non-JSON source value cannot be materialized');
}

export function materializeImage(config: ImageDraftConfig, options: ImageMaterializationOptions) {
  if (config.type !== 'image') throw new Error('$.config.type: expected image');
  if (typeof config.id !== 'string' || !uuidPattern.test(config.id) || config.id === nilUuid)
    throw new Error('$.config.id: immutable, non-nil UUID is required');
  if (
    typeof config.slug !== 'string' ||
    !slugPattern.test(config.slug) ||
    config.slug === '__proto__' ||
    config.slug === 'constructor'
  )
    throw new Error('$.config.slug: unsafe or missing slug');
  const language = options.documentLanguage;
  if (!languagePattern.test(language)) throw new Error('$.production.documentLanguage: invalid source language');
  const planned = options.plannedLanguages ?? [language];
  if (
    !planned.length ||
    new Set(planned).size !== planned.length ||
    !planned.every(item => languagePattern.test(item)) ||
    !planned.includes(language)
  )
    throw new Error('$.production.plannedLanguages: invalid list or missing source language');
  const directory = options.directory ?? '';
  if (
    directory &&
    (directory.startsWith('/') ||
      directory.split('/').some(part => !/^[A-Za-z0-9_-]+$/.test(part) || part === '.' || part === '..'))
  )
    throw new Error('directory: unsafe output path');
  if (directory && !options.languagesImport)
    throw new Error('languagesImport: nested materializers require an explicit root languages module');
  const languagesImport = options.languagesImport ?? './languages';
  if (
    !(
      /^(?:\.\/|\.\.\/)[A-Za-z0-9./_-]+$/.test(languagesImport) ||
      /^#[A-Za-z0-9/_-]+$/.test(languagesImport) ||
      /^@svitlo\/[A-Za-z0-9/_-]+$/.test(languagesImport)
    ) ||
    languagesImport.includes('\\')
  )
    throw new Error('languagesImport: expected relative module specifier');
  const allowed = new Set(['id', 'slug', 'type', 'params', 'locale']);
  for (const key of Object.keys(config)) {
    if (!allowed.has(key)) throw new Error('$.config.' + key + ': unexpected image Config field');
  }
  const fields: Record<string, unknown> = {
    id: config.id,
    slug: config.slug,
    type: config.type,
    params: config.params ?? {},
    locale: config.locale === undefined ? {} : sourceOnly(config.locale, language, '$.config.locale'),
  };
  const files: SourceFile[] = [];
  const diagnostics: Diagnostic[] = [];
  const blockers: string[] = [];
  const expressions: Record<string, string> = {};
  const imports = ['defineImage'];
  function block(field: string, code: string, instruction: string): void {
    blockers.push('// TODO (BLOCKER): ' + instruction + ' for image ' + config.id + '.');
    diagnostics.push({ path: '$.config.' + field, code, message: instruction, severity: 'warning' });
  }
  function requireCopy(field: string, description: string): void {
    const locale = isRecord(fields.locale) ? fields.locale : {};
    const value = locale[field];
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && !value.trim()) ||
      (isRecord(value) && (!Object.keys(value).length || value[language] === undefined))
    ) {
      block('locale.' + field, 'pending-copy', 'Supply ' + description);
    }
  }
  function requireMedia(field: string, ext: string): void {
    const locale = isRecord(fields.locale) ? fields.locale : {};
    const prior = locale[field];
    const missing =
      prior === undefined ||
      prior === null ||
      (isRecord(prior) && (Object.keys(prior).length === 0 || prior[language] === undefined));
    const placeholder = nilUuid + '.' + ext;
    if (missing) {
      locale[field] =
        isRecord(config.locale) && isRecord((config.locale as Record<string, unknown>)[field])
          ? { [language]: placeholder }
          : placeholder;
    }
    const current = locale[field];
    const localized = isRecord(current);
    const reference = localized ? current[language] : current;
    if (typeof reference === 'string' && reference.startsWith(nilUuid + '.')) {
      const fieldPath = 'locale.' + field + (localized ? '.' + language : '');
      const instruction = 'Supply verified ' + field + ' asset (reserved Nil UUID is not an asset)';
      expressions[fieldPath] =
        '// TODO (BLOCKER): ' + instruction + ' for image ' + config.id + '.\n' + JSON.stringify(reference);
      diagnostics.push({
        path: '$.config.' + fieldPath,
        code: 'pending-media',
        message: instruction,
        severity: 'warning',
      });
    }
    fields.locale = locale;
  }
  if (planned.length > 1) {
    blockers.push('// TODO (BLOCKER): Restore reviewed languages ' + JSON.stringify(planned) + '.');
    diagnostics.push({
      path: '$.production.plannedLanguages',
      code: 'pending-locales',
      message: 'Only the original source language is materialized',
      severity: 'warning',
    });
  }

  requireMedia('fileName', 'webp');
  requireCopy('alt', 'accessible Image alt text');
  const params = isRecord(fields.params) ? fields.params : {};
  if (
    params.fill === true ? params.aspectRatio === undefined : params.width === undefined || params.height === undefined
  ) {
    block('params', 'pending-image-size', 'Supply Image dimensions or aspect ratio');
  }

  // The returned index.ts must satisfy the *actual* defineImage Config type.
  // A TODO cannot make a missing required field type-valid. Refuse to emit
  // executable source until reviewed mandatory fields exist. Media's reserved
  // Nil UUID filename is the single explicitly permitted pending Config value.
  const incomplete = diagnostics.filter(item => item.code !== 'pending-locales' && item.code !== 'pending-media');
  if (incomplete.length) {
    throw new Error(
      'Cannot materialize type-valid Image Config (TODO (BLOCKER)): ' +
        incomplete.map(item => item.path + ': ' + item.message).join('; '),
    );
  }
  const checked = image_Config_Schema.safeParse(fields);
  if (!checked.success) {
    throw new Error('Cannot materialize type-valid Image Config (TODO (BLOCKER)): ' + checked.error.message);
  }
  // Non-strict Zod objects may strip unknown keys. Never emit those extra
  // fields (invalid at TS call sites) or silently discard reviewed input.
  if (!isDeepStrictEqual(checked.data, fields)) {
    throw new Error('Cannot materialize type-valid Image Config: unsupported authored fields');
  }

  const inlineSpecification = renderTemporaryMediaSpecification(options.production, 'Image');
  if (inlineSpecification) {
    diagnostics.push({
      path: '$.production.specification',
      code: 'pending-temporary-specification',
      message: 'Remove temporary Image specification after implementation and verification',
      severity: 'warning',
    });
  }

  const name = reserved.has(config.slug) ? 'config_' + config.slug : config.slug;
  const source =
    'import { ' +
    [...new Set(imports)].join(', ') +
    " } from '@svitlo/engine/build';\n" +
    'import { languages } from ' +
    JSON.stringify(languagesImport) +
    ';\n\n' +
    (blockers.length ? blockers.join('\n') + '\n' : '') +
    'export const ' +
    name +
    ' = defineImage<' +
    JSON.stringify(config.slug) +
    ', typeof languages>(' +
    printValue(fields, expressions) +
    ');\n' +
    inlineSpecification;
  files.unshift({ path: 'index.ts', content: source, kind: 'typescript' });
  return {
    exportName: name,
    files: files.map(file => ({ ...file, path: directory ? directory + '/' + file.path : file.path })),
    diagnostics,
  };
}
