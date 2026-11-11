import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import {
  audio_Config_Schema,
  type ContentBlock_Audio_Config,
  type ContentBlock_Audio_Locale,
} from './defineAudio.schemas';

const validate = (config: ContentBlock_Audio_Config) => {
  audio_Config_Schema.parse(config);
};

export const defineAudio = <const Slug extends string>(
  config: Omit<ContentBlock_Audio_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Audio_Config>;

  const overrides: DeepPartial<ContentBlock_Audio_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Audio_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Audio_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Audio_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Audio_Configurator = ReturnType<typeof defineAudio>;
