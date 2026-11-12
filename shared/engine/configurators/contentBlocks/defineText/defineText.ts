import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import { onlyLocales } from '../../_shared__configurators';
import {
  text_Config_Schema,
  text_Override_Config_Schema,
  type ContentBlock_Text_Config,
  type ContentBlock_Text_Locale,
  type ContentBlock_Text_ResourceBase,
} from './defineText.schemas';
import { validateTextVariables } from './defineText.utils';

export type ContentBlock_Text_Overrides = DeepPartial<Pick<ContentBlock_Text_Config, 'params' | 'locale'>>;

type TextLocales = Partial<Record<LanguageCodes, ContentBlock_Text_Locale<'props'>>>;
type TextAssembly<Base> = { base: Base; locales: TextLocales | undefined };

const parseAndValidate = (config: ContentBlock_Text_Config): ContentBlock_Text_Config => {
  const parsed = text_Config_Schema.parse(config);
  validateTextVariables(parsed);
  return parsed;
};
const validate = (config: ContentBlock_Text_Config): void => {
  parseAndValidate(config);
};

/** Put invariant Text values in base; publish translations by language. */
const assembleLocales = (value: ContentBlock_Text_Config['locale']['value'] | undefined): TextLocales | undefined => {
  const locales: TextLocales = {};
  if (value && typeof value === 'object') {
    for (const [language, text] of Object.entries(value)) {
      if (text !== undefined) locales[language as LanguageCodes] = { value: text };
    }
  }
  return Object.keys(locales).length ? locales : undefined;
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
  const locales = assembleLocales(locale.value);
  if (locales === undefined && typeof base.locale?.value !== 'string') {
    throw new Error('Text resource has neither a base value nor localized values');
  }
  return { base, locales };
};

/** Text fields use object patches; variable rules merge by key and arrays replace. */
const mergeTextOverride = (source: ContentBlock_Text_Config, patch: ContentBlock_Text_Overrides) => ({
  ...source,
  ...patch,
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
 * `assemble.resource()` publishes the authored resource. `assemble.overrides(patch)`
 * validates and publishes a complete variant without changing authored Text fields.
 */
export const defineText = <const Slug extends string>(
  config: Omit<ContentBlock_Text_Config, 'slug'> & { slug: Slug },
) => {
  const authored = parseAndValidate(config);
  const { id, type } = authored;
  const slug = config.slug;
  // Zod clones declared fields. typographyProps remains opaque to Engine.
  const copyAuthored = () => text_Config_Schema.parse(authored);
  const base = { ...assembleText(copyAuthored()).base, slug };

  const resource = (): TextAssembly<ContentBlock_Text_ResourceBase> => assembleText(copyAuthored());

  const overrides = (patch: ContentBlock_Text_Overrides): TextAssembly<ContentBlock_Text_ResourceBase> => {
    try {
      const resolved = text_Override_Config_Schema.parse(mergeTextOverride(copyAuthored(), patch));
      validateTextVariables(resolved);
      return assembleText(resolved);
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
    assemble: { resource, overrides },
    // Kept while parent configurators still use the existing child boundary.
    // Remove this authored-view API when their assembly migration lands.
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
