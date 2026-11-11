import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import { text_Config_Schema, type ContentBlock_Text_Config, type ContentBlock_Text_Locale } from './defineText.schemas';
import { validateTextVariables } from './validateTextVariables';

const validate = (config: ContentBlock_Text_Config) => {
  text_Config_Schema.parse(config);
  validateTextVariables(config);
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
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Text_Config>;

  const overrides: DeepPartial<ContentBlock_Text_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Text_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Text_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Text_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
