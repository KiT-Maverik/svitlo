import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import {
  youtube_Config_Schema,
  type ContentBlock_Youtube_Config,
  type ContentBlock_Youtube_Locale,
} from './defineYoutube.schemas';

export const defineYoutube = (config: ContentBlock_Youtube_Config) => {
  youtube_Config_Schema.parse(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Youtube_Config>;

  const overrides: DeepPartial<ContentBlock_Youtube_Config> = {};

  return {
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Youtube_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Youtube_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Youtube_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Youtube_Configurator = ReturnType<typeof defineYoutube>;
