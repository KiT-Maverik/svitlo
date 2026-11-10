import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import {
  video_Config_Schema,
  type ContentBlock_Video_Config,
  type ContentBlock_Video_Locale,
} from './defineVideo.schemas';

export const defineVideo = (config: ContentBlock_Video_Config) => {
  video_Config_Schema.parse(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Video_Config>;

  const overrides: DeepPartial<ContentBlock_Video_Config> = {};

  return {
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Video_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Video_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Video_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Video_Configurator = ReturnType<typeof defineVideo>;
