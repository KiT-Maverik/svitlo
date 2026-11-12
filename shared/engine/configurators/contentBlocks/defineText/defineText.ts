import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';

import { onlyLocales } from '../../_shared__configurators';
import {
  text_Config_Schema,
  type ContentBlock_Text_Config,
  type ContentBlock_Text_Locale,
  type ContentBlock_Text_ResourceBase,
} from './defineText.schemas';
import { validateTextVariables } from './defineText.utils';

export type ContentBlock_Text_Overrides = DeepPartial<Pick<ContentBlock_Text_Config, 'params' | 'locale'>>;

type TextLocales = Partial<Record<LanguageCodes, ContentBlock_Text_Locale<'props'>>>;
type TextAssembly<Base> = { base: Base; locales: TextLocales | undefined };
type TextOverrideBase = {
  params?: DeepPartial<ContentBlock_Text_Config['params']>;
  locale?: Partial<ContentBlock_Text_Locale<'props'>>;
};

const validate = (config: ContentBlock_Text_Config): void => {
  const parsed = text_Config_Schema.parse(config);
  validateTextVariables(parsed);
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
 * `assemble.resource()` publishes a complete, validated resource. The
 * `assemble.overrides(patch)` method validates against this definition but
 * returns only the supplied patch, never mutating the shared configurator.
 * Applying published overrides to Props is the consumer's responsibility.
 */
export const defineText = <const Slug extends string>(
  config: Omit<ContentBlock_Text_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);
  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    ...(typeof locale.value === 'string' ? { locale: { value: locale.value } } : {}),
  } satisfies ContentBlock_Text_ResourceBase;

  const resource = (): TextAssembly<ContentBlock_Text_ResourceBase> => {
    const locales = assembleLocales(locale.value);
    if (locales === undefined && typeof base.locale?.value !== 'string') {
      throw new Error('Text resource has neither a base value nor localized values');
    }
    return { base: { ...base }, locales };
  };

  const overrides = (patch: ContentBlock_Text_Overrides): TextAssembly<TextOverrideBase> => {
    // Resolve only Text's own fields for validation. Do not persist the
    // candidate: the consumer will apply the published patch at runtime.
    const variables = patch.params?.variables
      ? {
          ...params.variables,
          ...Object.fromEntries(
            Object.entries(patch.params.variables).map(([key, value]) => [
              key,
              { ...params.variables?.[key], ...value },
            ]),
          ),
        }
      : params.variables;

    const value =
      patch.locale?.value !== undefined && typeof patch.locale.value === 'object' && typeof locale.value === 'object'
        ? { ...locale.value, ...patch.locale.value }
        : (patch.locale?.value ?? locale.value);

    validate({
      ...config,
      params: {
        ...params,
        ...patch.params,
        variables,
        ...(patch.params?.wrap ? { wrap: { ...params.wrap, ...patch.params.wrap } } : {}),
      },
      locale: { ...locale, ...patch.locale, value },
    } as ContentBlock_Text_Config);

    const locales = assembleLocales(patch.locale?.value);
    const overrideBase: TextOverrideBase = {
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(typeof patch.locale?.value === 'string' ? { locale: { value: patch.locale.value } } : {}),
    };
    if (patch.locale?.value !== undefined && locales === undefined && typeof overrideBase.locale?.value !== 'string') {
      throw new Error('Text override has neither a base value nor localized values');
    }
    return { base: overrideBase, locales };
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
        locale: onlyLocales(locale),
      }),
      validate,
    },
  } as const;
};

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
