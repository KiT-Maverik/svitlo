import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import { onlyLocales, wrapLocale, type ResourceAssembler, type WrappedLocaleFiles } from '../../_shared__configurators';
import {
  text_Config_Schema,
  text_Override_Config_Schema,
  type ContentBlock_Text_Config,
  type ContentBlock_Text_Locale,
  type ContentBlock_Text_Overrides,
  type ContentBlock_Text_ResourceBase,
} from './defineText.schemas';
import { validateTextVariables } from './defineText.utils';

type TextLocaleFiles = Partial<Record<LanguageCodes, ContentBlock_Text_Locale<'props'>>>;
type TextEmbeddedLocaleFiles = WrappedLocaleFiles<ContentBlock_Text_Locale<'props'>>;
type TextAssembly<Base, LocaleFiles = TextLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type TextOverrideBase = {
  params?: ContentBlock_Text_Overrides['params'];
  locale?: Partial<ContentBlock_Text_Locale<'props'>>;
};

const parseAndValidate = (config: ContentBlock_Text_Config): ContentBlock_Text_Config => {
  const parsed = text_Config_Schema.parse(config);
  validateTextVariables(parsed);
  return parsed;
};
const validate = (config: ContentBlock_Text_Config): void => {
  parseAndValidate(config);
};

/** Publish only language dictionaries, with no extra locale wrapper in each file. */
const assembleLocale = (
  value: ContentBlock_Text_Config['locale']['value'] | undefined,
): TextLocaleFiles | undefined => {
  const locale: TextLocaleFiles = {};
  if (value && typeof value === 'object') {
    for (const [language, text] of Object.entries(value)) {
      if (text !== undefined) locale[language as LanguageCodes] = { value: text };
    }
  }
  return Object.keys(locale).length ? locale : undefined;
};

const assembleText = (config: ContentBlock_Text_Config): TextAssembly<ContentBlock_Text_ResourceBase> => {
  const { id, type, slug, params, locale } = config;
  const base = {
    id,
    type,
    slug,
    params,
    ...(typeof locale.value === 'string' ? { locale: { value: locale.value } } : {}),
  } satisfies ContentBlock_Text_ResourceBase;
  const translations = assembleLocale(locale.value);
  if (translations === undefined && typeof base.locale?.value !== 'string') {
    throw new Error('Text resource has neither a base value nor localized values');
  }
  return { base, locale: translations };
};

/** Publish only the validated, supplied fields, never the temporary resolved config. */
const assembleTextPatch = (patch: ContentBlock_Text_Overrides): TextAssembly<TextOverrideBase> => ({
  base: {
    ...(patch.params !== undefined ? { params: patch.params } : {}),
    ...(typeof patch.locale?.value === 'string' ? { locale: { value: patch.locale.value } } : {}),
  },
  locale: assembleLocale(patch.locale?.value),
});

/** Text dictionaries merge by language, variable rules by key; opaque values replace. */
const mergeTextOverride = (source: ContentBlock_Text_Config, patch: ContentBlock_Text_Overrides) => ({
  ...source,
  params: {
    ...source.params,
    ...patch.params,
    ...(patch.params?.wrap ? { wrap: { ...source.params.wrap, ...patch.params.wrap } } : {}),
    ...(patch.params?.variables
      ? {
          variables: {
            ...source.params.variables,
            ...Object.fromEntries(
              Object.entries(patch.params.variables).map(([key, rule]) => [
                key,
                { ...source.params.variables?.[key], ...rule },
              ]),
            ),
          },
        }
      : {}),
  },
  locale: {
    ...source.locale,
    ...patch.locale,
    value:
      patch.locale?.value !== undefined &&
      typeof patch.locale.value === 'object' &&
      typeof source.locale.value === 'object'
        ? { ...source.locale.value, ...patch.locale.value }
        : (patch.locale?.value ?? source.locale.value),
  },
});

/**
 * Define localized Text with optional styling for inline fragments.
 *
 * @remarks
 * In `locale.value`, use `%_%id: personName; value: Maria%_%`.
 * The fragment displays its `value` and uses its camelCase `id`
 * to select a styling rule from the `params.variables` object, keyed by ID.
 * Unlike Code variables, the visible value is authored inline in each locale.
 * Every configured variable ID must appear in every supplied locale value,
 * with no undeclared or malformed fragments.
 *
 * `assemble.resource()` publishes the complete authored resource.
 * `assemble.resource({ embed: true })` wraps translated fields in a Props-shaped `locale` field.
 * `assemble.overrides(patch)` strictly checks the sparse patch, validates
 * a temporary merged config, and publishes only the patch. Neither method
 * mutates the original Text configurator.
 */
export const defineText = <const Slug extends string>(
  config: Omit<ContentBlock_Text_Config, 'slug'> & { slug: Slug },
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => text_Config_Schema.parse(structuredClone(authored));
  const base = { ...assembleText(copyAuthored()).base, slug };

  function resource(): TextAssembly<ContentBlock_Text_ResourceBase>;
  function resource(options: { embed: true }): TextAssembly<ContentBlock_Text_ResourceBase, TextEmbeddedLocaleFiles>;
  function resource(options?: {
    embed?: true;
  }): TextAssembly<ContentBlock_Text_ResourceBase, TextLocaleFiles | TextEmbeddedLocaleFiles> {
    const assembled = assembleText(copyAuthored());
    return options?.embed ? { base: assembled.base, locale: wrapLocale(assembled.locale) } : assembled;
  }

  const resourceApi: ResourceAssembler<ContentBlock_Text_ResourceBase, ContentBlock_Text_Locale<'props'>> = resource;

  const overrides = (patch: ContentBlock_Text_Overrides): TextAssembly<TextOverrideBase> => {
    try {
      // Structural: reject unknown fields, bad types, and invalid locale keys.
      const validatedPatch = text_Override_Config_Schema.parse(patch);

      // Semantic: inspect the fully resolved candidate, never publish it.
      const resolved = text_Config_Schema.parse(mergeTextOverride(copyAuthored(), validatedPatch));
      validate(resolved);

      return assembleTextPatch(structuredClone(validatedPatch));
    } catch (error) {
      throw new Error(`Invalid Text overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };

  return {
    id,
    slug,
    type,
    validate,
    assemble: { resource: resourceApi, overrides },
    // Transitional compatibility for parents not migrated to assembly yet.
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Text_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
