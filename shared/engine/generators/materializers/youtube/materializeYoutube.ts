/**
 * Concrete Youtube source materializer. Returns a deterministic create-only
 * *plan*: parent #775 owns path joining, preflight, symlink checks and writes.
 * This is not a Props/JSON publisher, and never executes the YAML builder.
 */
import { isDeepStrictEqual } from 'node:util';

import {
  youtube_Config_Schema,
  type ContentBlock_Youtube_Config,
} from '../../../configurators/contentBlocks/defineYoutube';
import { UNRESOLVED_YOUTUBE_HREF } from '../../../schemas/media.schemas';
import { renderBlockerSpecification, renderBlockerTodo } from '../renderBlockerTodo.mjs';

export type YoutubeDraftConfig = Pick<ContentBlock_Youtube_Config, 'id' | 'slug' | 'type'> & {
  params?: Partial<ContentBlock_Youtube_Config['params']>;
  locale?: Partial<ContentBlock_Youtube_Config['locale']>;
};

export interface YoutubeMaterializationOptions {
  documentLanguage: string;
  plannedLanguages?: readonly string[];
  /** Relative module specifier for the parent-owned source-only languages.ts. */
  languagesImport?: string;
  /** Node directory, relative to the enclosing authored entity root. */
  directory?: string;
  /** Authoring-only notes, never passed to the final defineYoutube call. */
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
const nilUuid = '00000000-0000-0000-0000-000000000000';
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

export function materializeYoutube(config: YoutubeDraftConfig, options: YoutubeMaterializationOptions) {
  if (config.type !== 'youtube') throw new Error('$.config.type: expected youtube');
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
    if (!allowed.has(key)) throw new Error('$.config.' + key + ': unexpected youtube Config field');
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
  const imports = ['defineYoutube'];
  function block(field: string, code: string, instruction: string): void {
    blockers.push(renderBlockerTodo(instruction + ' for youtube ' + config.id + '.'));
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
  if (planned.length > 1) {
    blockers.push(
      renderBlockerTodo(
        'Restore reviewed languages ' + JSON.stringify(planned) + ' after approved translations and verified coverage.',
      ),
    );
    diagnostics.push({
      path: '$.production.plannedLanguages',
      code: 'pending-locales',
      message: 'Only the original source language is materialized',
      severity: 'warning',
    });
  }

  const hrefLocale = isRecord(fields.locale) ? fields.locale : {};
  const href = hrefLocale.href;
  if (href === undefined || (isRecord(href) && !Object.hasOwn(href, language))) {
    hrefLocale.href = isRecord(config.locale?.href) ? { [language]: UNRESOLVED_YOUTUBE_HREF } : UNRESOLVED_YOUTUBE_HREF;
  }
  const resolvedHref = hrefLocale.href;
  const unresolvedHref =
    resolvedHref === UNRESOLVED_YOUTUBE_HREF ||
    (isRecord(resolvedHref) && resolvedHref[language] === UNRESOLVED_YOUTUBE_HREF);
  if (
    resolvedHref === UNRESOLVED_YOUTUBE_HREF ||
    (isRecord(resolvedHref) && resolvedHref[language] === UNRESOLVED_YOUTUBE_HREF)
  ) {
    const fieldPath = 'locale.href' + (isRecord(resolvedHref) ? '.' + language : '');
    expressions[fieldPath] =
      renderBlockerTodo('Supply and verify the YouTube URL, access and captions before publication.') +
      '\n' +
      JSON.stringify(UNRESOLVED_YOUTUBE_HREF);
    diagnostics.push({
      path: '$.config.' + fieldPath,
      code: 'pending-media',
      message: 'Supply a verified YouTube URL; the reserved sentinel is not a video reference.',
      severity: 'warning',
    });
  } else {
    requireCopy('href', 'verified YouTube URL');
  }
  fields.locale = hrefLocale;
  requireCopy('label', 'accessible YouTube label');
  const params = isRecord(fields.params) ? fields.params : {};
  if (params.mode !== 'link' && params.mode !== 'embed') {
    block('params.mode', 'pending-youtube-mode', 'Select reviewed YouTube link/embed mode');
  }

  // The returned index.ts must satisfy the *actual* defineYoutube Config type.
  // A TODO cannot make a missing required field type-valid. Refuse to emit
  // executable source until reviewed mandatory fields exist. Media's reserved
  // The reserved non-URL sentinel is the only pending YouTube href.
  const incomplete = diagnostics.filter(item => item.code !== 'pending-locales' && item.code !== 'pending-media');
  if (incomplete.length) {
    throw new Error(
      'Cannot materialize type-valid Youtube Config (TODO (BLOCKER)): ' +
        incomplete.map(item => item.path + ': ' + item.message).join('; '),
    );
  }
  const checked = youtube_Config_Schema.safeParse(fields);
  if (!checked.success) {
    throw new Error('Cannot materialize type-valid Youtube Config (TODO (BLOCKER)): ' + checked.error.message);
  }
  // Non-strict Zod objects may strip unknown keys. Never emit those extra
  // fields (invalid at TS call sites) or silently discard reviewed input.
  if (!isDeepStrictEqual(checked.data, fields)) {
    throw new Error('Cannot materialize type-valid Youtube Config: unsupported authored fields');
  }

  // Even a syntactically valid link needs human media review; the authoring
  // URL/label are not proof of availability, rights or accessible alternatives.
  const verificationInstruction =
    'Verify external video (availability, appropriateness, access, captions, language/offline alternative, link) during Lesson Stage 6 media work';
  // The missing-URL TODO already blocks publication. Add the separate
  // verification instruction only after there is a real URL to review.
  if (!unresolvedHref) {
    blockers.push(
      renderBlockerTodo(
        verificationInstruction + ' for youtube ' + config.id + '; remove after recorded media verification.',
      ),
    );
    diagnostics.push({
      path: '$.config.locale.href',
      code: 'pending-youtube-verification',
      message: verificationInstruction,
      severity: 'warning',
    });
  }

  if (options.production !== undefined) {
    if (!isRecord(options.production)) throw new Error('$.production: expected plain authoring notes');
    const details = Object.entries(options.production).filter(
      ([key]) => key !== 'pending' && key !== 'documentLanguage',
    );
    if (details.length) {
      // One removable source comment owns the reviewed external-video brief,
      // including its independent human media-verification obligation.
      blockers.push(
        renderBlockerSpecification(
          'Verify external video access, rights, captions and language/offline alternatives for youtube ' +
            config.id +
            '; remove this temporary brief after documented media QA.',
          details
            .map(([key, value]) => key + ': ' + (typeof value === 'string' ? value : JSON.stringify(value)))
            .join('\n'),
        ),
      );
    }
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
    ' = defineYoutube<' +
    JSON.stringify(config.slug) +
    ', typeof languages>(' +
    printValue(fields, expressions) +
    ');\n';
  files.unshift({ path: 'index.ts', content: source, kind: 'typescript' });
  return {
    exportName: name,
    files: files.map(file => ({ ...file, path: directory ? directory + '/' + file.path : file.path })),
    diagnostics,
  };
}
