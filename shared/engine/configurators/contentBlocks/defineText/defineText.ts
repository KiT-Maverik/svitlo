import type { DeepPartial, ConfigWithLanguages, LanguageScope, PublicationLanguageOptions } from '#types';
import type { LanguageCode } from '#schemas';

import {
  onlyLocales,
  resolvePublicationLanguages,
  selectPublicationLocales,
  validateRequestedPublication,
} from '../../_shared__configurators';
import {
  text_Config_Schema,
  text_Props_Schema,
  text_Override_Config_Schema,
  type ContentBlock_Text_Config,
  type ContentBlock_Text_Locale,
  type ContentBlock_Text_Overrides,
  type ContentBlock_Text_PropsBase,
} from './defineText.schemas';
import { validateTextVariables } from './defineText.utils';

type TextLocaleFiles = Partial<Record<LanguageCode, { locale: ContentBlock_Text_Locale<'props'> }>>;
type TextPropsPublication<Base, LocaleFiles = TextLocaleFiles> = { base: Base; locale: LocaleFiles | undefined };
type TextOverridePropsBase = {
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

/** Every translated file is already a Props-shaped fragment. */
const buildLocale = (value: ContentBlock_Text_Config['locale']['value'] | undefined): TextLocaleFiles | undefined => {
  const locale: TextLocaleFiles = {};
  if (value && typeof value === 'object') {
    for (const [language, text] of Object.entries(value)) {
      if (text !== undefined) locale[language as LanguageCode] = { locale: { value: text } };
    }
  }
  return Object.keys(locale).length ? locale : undefined;
};

const buildTextProps = (config: ContentBlock_Text_Config): TextPropsPublication<ContentBlock_Text_PropsBase> => {
  const { id, type, slug, params, locale } = config;
  const base = {
    id,
    type,
    slug,
    params,
    ...(typeof locale.value === 'string' ? { locale: { value: locale.value } } : {}),
  } satisfies ContentBlock_Text_PropsBase;
  const translations = buildLocale(locale.value);
  if (translations === undefined && typeof base.locale?.value !== 'string') {
    throw new Error('Text resource has neither a base value nor localized values');
  }
  return { base, locale: translations };
};

/** Publish only the validated, supplied fields, never the temporary resolved config. */
const buildTextPatch = (patch: ContentBlock_Text_Overrides): TextPropsPublication<TextOverridePropsBase> => ({
  base: {
    ...(patch.params !== undefined ? { params: patch.params } : {}),
    ...(typeof patch.locale?.value === 'string' ? { locale: { value: patch.locale.value } } : {}),
  },
  locale: buildLocale(patch.locale?.value),
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
 * `build.props({ languages })` prepares the complete authored resource.
 * Every translated file is a Props-shaped fragment, including its own `locale` field.
 * `build.overrides(patch, { languages })` strictly checks the sparse patch, validates
 * a temporary merged config, and publishes only the patch. Neither method
 * mutates the original Text configurator.
 */
export const defineText = <const Slug extends string, const Languages extends readonly LanguageCode[] = []>(
  config: Omit<ContentBlock_Text_Config, 'slug'> & { slug: Slug } & ConfigWithLanguages<
      ContentBlock_Text_Config,
      Languages
    >,
) => {
  const authored = structuredClone(parseAndValidate(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyAuthored = () => text_Config_Schema.parse(structuredClone(authored));
  const base = { ...buildTextProps(copyAuthored()).base, slug };

  const props = (options: PublicationLanguageOptions<Languages>): TextPropsPublication<ContentBlock_Text_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const result = buildTextProps(copyAuthored());
    result.locale = selectPublicationLocales(result.locale, languages);
    validateRequestedPublication(text_Props_Schema, result, languages);
    return result;
  };

  const overrides = (
    patch: ContentBlock_Text_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): TextPropsPublication<TextOverridePropsBase> => {
    const languages = resolvePublicationLanguages(options);
    try {
      // Structural: reject unknown fields, bad types, and invalid locale keys.
      const validatedPatch = text_Override_Config_Schema.parse(patch);

      // Semantic: inspect the fully resolved candidate, never publish it.
      const resolved = text_Config_Schema.parse(mergeTextOverride(copyAuthored(), validatedPatch));
      validate(resolved);

      const output = buildTextPatch(structuredClone(validatedPatch));
      output.locale = selectPublicationLocales(output.locale, languages);
      validateRequestedPublication(text_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(`Invalid Text overrides for ${id}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      });
    }
  };

  const result = {
    id,
    slug,
    type,
    validate,
    build: { props, overrides },
    // Transitional compatibility for parents not migrated to assembly yet.
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Text_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
