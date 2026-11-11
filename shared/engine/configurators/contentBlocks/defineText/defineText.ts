import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import { text_Config_Schema, type ContentBlock_Text_Config, type ContentBlock_Text_Locale } from './defineText.schemas';

const validate = (config: ContentBlock_Text_Config) => {
  text_Config_Schema.parse(config);
};

/**
 * Define localized Text with optional styling for inline fragments.
 *
 * @remarks
 * In `locale.value`, use `%_%id: personName; value: Maria%_%`.
 * The fragment displays its `value` and uses `id` to select a
 * `params.styling` rule. The ID must be camelCase; it is
 * not a Code replacement variable. Ordinary text remains unchanged.
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
