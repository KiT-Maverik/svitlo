import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ConfigWithLanguages, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import { validateReplacementVariables } from '../_shared__contentBlocks';
import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateRequestedPublication,
  scopeBuild,
} from '../../_shared__configurators';
import {
  markdown_Config_Schema,
  markdown_Override_Config_Schema,
  markdown_Props_Schema,
  type ContentBlock_Markdown_Config,
  type ContentBlock_Markdown_Locale,
  type ContentBlock_Markdown_Overrides,
  type ContentBlock_Markdown_PropsBase,
} from './defineMarkdown.schemas';

type MarkdownLocaleFiles = Partial<
  Record<LanguageCode, { locale: DeepPartial<ContentBlock_Markdown_Locale<'props'>> }>
>;
type MarkdownPropsPublication<Base, LocaleFiles = MarkdownLocaleFiles> = {
  base: Base;
  locale: LocaleFiles | undefined;
};
type MarkdownOverridePropsBase = {
  params?: ContentBlock_Markdown_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Markdown_Locale<'props'>>;
};

type MarkdownAuthoringConfig<Slug extends string, Languages extends readonly LanguageCode[]> = Omit<
  ContentBlock_Markdown_Config,
  'slug'
> & { slug: Slug } & ConfigWithLanguages<ContentBlock_Markdown_Config, Languages>;

const parseAndValidate = (config: ContentBlock_Markdown_Config): ContentBlock_Markdown_Config => {
  const parsed = markdown_Config_Schema.parse(config);
  const errors = validateReplacementVariables(parsed.locale.value, parsed.locale.variables, 'locale.value');
  if (errors.length) throw new Error('Markdown variables validation failed:\n' + errors.join('\n'));
  return parsed;
};
const validate = (config: ContentBlock_Markdown_Config): void => {
  parseAndValidate(config);
};

const buildMarkdownProps = (
  config: ContentBlock_Markdown_Config,
): MarkdownPropsPublication<ContentBlock_Markdown_PropsBase> => {
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
  } satisfies ContentBlock_Markdown_PropsBase;
  return {
    base,
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      MarkdownLocaleFiles | undefined,
  };
};

const buildMarkdownPatch = (
  patch: ContentBlock_Markdown_Overrides,
): MarkdownPropsPublication<MarkdownOverridePropsBase> => {
  const { base: invariant, locale } = splitLocalizedFields(patch.locale ?? {});
  return {
    base: {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(Object.keys(invariant).length
        ? { locale: invariant as unknown as DeepPartial<ContentBlock_Markdown_Locale<'props'>> }
        : {}),
    },
    locale: (locale === undefined
      ? undefined
      : Object.fromEntries(Object.entries(locale).map(([language, fields]) => [language, { locale: fields }]))) as
      MarkdownLocaleFiles | undefined,
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
    const localized = replacement as Partial<Record<LanguageCode, string>>;
    const complete: Partial<Record<LanguageCode, string>> = {};
    for (const language of Object.keys(effective.locale.value)) {
      const code = language as LanguageCode;
      complete[code] = localized[code] ?? previous;
    }
    effective.locale.variables = { ...effective.locale.variables, [name]: complete };
  }
  // If a previously invariant source becomes localized for only one language,
  // unmentioned translations still use the invariant source. A localized
  // replacement dictionary can therefore contain languages absent from the
  // temporary, one-language source. Project those dictionaries *only for
  // semantic validation*, never for publication.
  if (typeof original.locale.value === 'string' && typeof patch.locale?.value === 'object') {
    const languages = new Set(Object.keys(effective.locale.value));
    for (const [name, value] of Object.entries(effective.locale.variables ?? {})) {
      if (typeof value === 'string') continue;
      const relevant = Object.fromEntries(Object.entries(value).filter(([language]) => languages.has(language)));
      effective.locale.variables = { ...effective.locale.variables, [name]: relevant };
    }
  }
  return effective;
};

/**
 * Define localized Markdown with optional Code-style replacement variables.
 *
 * Supports inline LaTeX formulas (`$...$`) and display formulas (`$$...$$`)
 * in Markdown source. UI Kit renders them with KaTeX; Engine stores the original
 * Markdown unchanged. Escape literal dollar signs as `\$`.
 *
 * @remarks
 * Pass Markdown text in `locale.value` (an invariant string or localized
 * language dictionary). To read colocated UTF-8 files, use the build-only
 * `readMarkdown(import.meta.url, languages?)` helper. A missing or empty
 * required source file is an error. Only text enters Config and Props.
 *
 * Use `%_%VARIABLE_NAME%_%` with UPPER_SNAKE_CASE keys in `locale.variables`.
 * Each declared variable must occur in every Markdown locale, and localized
 * replacement values must exist for every corresponding language.
 */
/**
 * Stateless ContentBlock Build API validates isolated snapshots and emits
 * either complete Props or exclusively sparse override fields.
 */
export const defineMarkdown = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: MarkdownAuthoringConfig<Slug, Languages>,
) => {
  const authored: ContentBlock_Markdown_Config = structuredClone(config);
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => structuredClone(authored);
  const base = {
    id,
    type,
    slug,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Markdown_Config>;

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): MarkdownPropsPublication<ContentBlock_Markdown_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildMarkdownProps(parseAndValidate(copyAuthored()));
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(markdown_Props_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Markdown_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): MarkdownPropsPublication<MarkdownOverridePropsBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      const parsedPatch = markdown_Override_Config_Schema.parse(patch);
      const effective = markdown_Config_Schema.parse(mergeMarkdownForValidation(copyAuthored(), parsedPatch));
      validate(effective);
      const output = buildMarkdownPatch(structuredClone(parsedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(markdown_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        `Invalid Markdown overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`,
        {
          cause: error,
        },
      );
    }
  };
  const result = {
    id,
    slug,
    type,
    validate,
    build: scopeBuild({ props, overrides }),
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Markdown_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Markdown_Configurator = ReturnType<typeof defineMarkdown>;
