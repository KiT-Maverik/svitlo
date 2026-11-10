import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import {text_Config_Schema, type ContentBlock_Text_Config, type ContentBlock_Text_Locale} from './defineText.schemas';

export const defineText = (config: ContentBlock_Text_Config) => {
  text_Config_Schema.parse(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Text_Config>;

  const overrides: DeepPartial<ContentBlock_Text_Config> = { };

  return {
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Text_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Text_Config['params']>) => overrides.params = newParams,
      locale: (newLocale: DeepPartial<ContentBlock_Text_Locale<'config'>>) => overrides.locale = newLocale,
    },
    disable: () => overrides.params = { disabled: true },
  } as const;
}

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
