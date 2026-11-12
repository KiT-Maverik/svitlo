import { readFileSync, readdirSync } from 'node:fs';
import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  wrapLocale,
  type ResourceAssembler,
  type WrappedLocaleFiles,
} from '../../_shared__configurators';
import { validateReplacementVariables } from '../_shared__contentBlocks';
import {
  markdown_Config_Schema,
  markdown_Override_Config_Schema,
  type ContentBlock_Markdown_Config,
  type ContentBlock_Markdown_Locale,
  type ContentBlock_Markdown_Overrides,
  type ContentBlock_Markdown_ResourceBase,
} from './defineMarkdown.schemas';

type MarkdownLocaleFiles = Partial<Record<LanguageCodes, DeepPartial<ContentBlock_Markdown_Locale<'props'>>>>;
type MarkdownEmbeddedLocaleFiles = WrappedLocaleFiles<DeepPartial<ContentBlock_Markdown_Locale<'props'>>>;
type MarkdownAssembly<Base, LocaleFiles = MarkdownLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type MarkdownOverrideBase = {
  params?: ContentBlock_Markdown_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Markdown_Locale<'props'>>;
};

type MarkdownFiles = { moduleUrl: string; languages: readonly LanguageCodes[] };

type MarkdownInlineConfig<Slug extends string> = Omit<ContentBlock_Markdown_Config, 'slug'> & {
  slug: Slug;
  files?: never;
};

type MarkdownFileConfig<Slug extends string> = Omit<ContentBlock_Markdown_Config, 'slug' | 'locale'> & {
  slug: Slug;
  files: MarkdownFiles;
  locale?: Omit<ContentBlock_Markdown_Locale<'config'>, 'value'>;
};

function readMarkdownFiles({ moduleUrl, languages }: MarkdownFiles): Partial<Record<LanguageCodes, string>> {
  if (!languages.length || new Set(languages).size !== languages.length) {
    throw new Error('Markdown files: languages must be a non-empty list without duplicates');
  }

  const directory = new URL('./locales/', moduleUrl);
  const expected = new Set(languages);
  const unexpected = readdirSync(directory).filter(
    name => name.endsWith('.md') && !expected.has(name.slice(0, -3) as LanguageCodes),
  );
  if (unexpected.length) throw new Error('Unexpected Markdown locale files: ' + unexpected.join(', '));

  const values: Partial<Record<LanguageCodes, string>> = {};
  for (const language of languages) {
    const file = new URL(language + '.md', directory);
    let value: string;
    try {
      value = readFileSync(file, 'utf8');
    } catch (cause) {
      throw new Error('Missing or unreadable Markdown locale file: ' + file.pathname, { cause });
    }
    if (!value.trim()) throw new Error('Empty Markdown locale file: ' + file.pathname);
    values[language] = value;
  }
  return values;
}

const parseAndValidate = (config: ContentBlock_Markdown_Config): ContentBlock_Markdown_Config => {
  const parsed = markdown_Config_Schema.parse(config);
  const errors = validateReplacementVariables(parsed.locale.value, parsed.locale.variables, 'locale.value');
  if (errors.length) throw new Error('Markdown variables validation failed:\n' + errors.join('\n'));
  return parsed;
};
const validate = (config: ContentBlock_Markdown_Config): void => {
  parseAndValidate(config);
};

const assembleMarkdown = (
  config: ContentBlock_Markdown_Config,
): MarkdownAssembly<ContentBlock_Markdown_ResourceBase> => {
  const { id, type, slug, params } = config;
  const { base: invariant, locale } = splitLocalizedFields(config.locale);
  const base = {
    id,
    type,
    slug,
    params,
    ...(Object.keys(invariant).length
      ? { locale: invariant as unknown as DeepPartial<ContentBlock_Markdown_Locale<'props'>> }
      : {}),
  } satisfies ContentBlock_Markdown_ResourceBase;
  return { base, locale: locale as unknown as MarkdownLocaleFiles | undefined };
};

const assembleMarkdownPatch = (patch: ContentBlock_Markdown_Overrides): MarkdownAssembly<MarkdownOverrideBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Markdown_Locale<'props'>> }
        : {}),
    },
    locale: locale as unknown as MarkdownLocaleFiles | undefined,
  };
};

/**
 * If an invariant replacement gets a one-language patch, preserve the
 * invariant for the remaining authored languages ONLY during validation.
 * The published patch remains one-language and does not inherit those values.
 */
const mergeMarkdownForValidation = (
  original: ContentBlock_Markdown_Config,
  patch: ContentBlock_Markdown_Overrides,
): ContentBlock_Markdown_Config => {
  const effective = mergeForValidation<ContentBlock_Markdown_Config>(original, patch);
  if (typeof effective.locale.value !== 'object') return effective;
  for (const [name, replacement] of Object.entries(patch.locale?.variables ?? {})) {
    const previous = original.locale.variables?.[name];
    if (typeof previous !== 'string' || !replacement || typeof replacement !== 'object') continue;
    const localized = replacement as Partial<Record<LanguageCodes, string>>;
    const complete: Partial<Record<LanguageCodes, string>> = {};
    for (const language of Object.keys(effective.locale.value)) {
      const code = language as LanguageCodes;
      complete[code] = localized[code] ?? previous;
    }
    effective.locale.variables = { ...effective.locale.variables, [name]: complete };
  }
  return effective;
};

/**
 * Define localized Markdown with optional Code-style replacement variables.
 *
 * @remarks
 * Store translations as `locales/<language>.md` beside the definition. Pass
 * `files: { moduleUrl: import.meta.url, languages }`; the files are read as
 * UTF-8 immediately and only their text is retained in the configurator.
 * Missing, empty, duplicate or unexpected locales fail during definition.
 * Alternatively, supply `locale.value` directly when text is already loaded.
 *
 * Use `%_%VARIABLE_NAME%_%` with UPPER_SNAKE_CASE keys in `locale.variables`.
 * Each declared variable must occur in every Markdown locale, and localized
 * replacement values must exist for every corresponding language.
 */
/**
 * Stateless authored ContentBlock. Assembly validates isolated snapshots and
 * emits either complete resources or exclusively sparse override fields.
 */
export const defineMarkdown = <const Slug extends string>(
  config: MarkdownInlineConfig<Slug> | MarkdownFileConfig<Slug>,
) => {
  const locale =
    'files' in config && config.files
      ? { ...config.locale, value: readMarkdownFiles(config.files) }
      : (config as MarkdownInlineConfig<Slug>).locale;
  const resolved: ContentBlock_Markdown_Config = {
    id: config.id,
    slug: config.slug,
    type: config.type,
    params: config.params,
    locale,
  };
  const authored = structuredClone(parseAndValidate(resolved));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => markdown_Config_Schema.parse(structuredClone(authored));
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Markdown_Config>;

  function resource(): MarkdownAssembly<ContentBlock_Markdown_ResourceBase>;
  function resource(options: {
    embed: true;
  }): MarkdownAssembly<ContentBlock_Markdown_ResourceBase, MarkdownEmbeddedLocaleFiles>;
  function resource(options?: {
    embed?: true;
  }): MarkdownAssembly<ContentBlock_Markdown_ResourceBase, MarkdownLocaleFiles | MarkdownEmbeddedLocaleFiles> {
    const assembled = assembleMarkdown(copyAuthored());
    return options?.embed ? { base: assembled.base, locale: wrapLocale(assembled.locale) } : assembled;
  }
  const resourceApi: ResourceAssembler<
    ContentBlock_Markdown_ResourceBase,
    DeepPartial<ContentBlock_Markdown_Locale<'props'>>
  > = resource;

  const overrides = (patch: ContentBlock_Markdown_Overrides): MarkdownAssembly<MarkdownOverrideBase> => {
    try {
      const parsedPatch = markdown_Override_Config_Schema.parse(patch);
      const effective = markdown_Config_Schema.parse(mergeMarkdownForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      return assembleMarkdownPatch(structuredClone(parsedPatch));
    } catch (error) {
      throw new Error(
        `Invalid Markdown overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`,
        {
          cause: error,
        },
      );
    }
  };
  return {
    id,
    slug,
    type,
    validate,
    assemble: { resource: resourceApi, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Markdown_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Markdown_Configurator = ReturnType<typeof defineMarkdown>;
