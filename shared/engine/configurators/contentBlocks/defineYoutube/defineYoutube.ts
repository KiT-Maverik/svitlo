import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared__configurators';

import {
  youtube_Config_Schema,
  type ContentBlock_Youtube_Config,
  type ContentBlock_Youtube_Locale,
} from './defineYoutube.schemas';

const validate = (config: ContentBlock_Youtube_Config) => {
  youtube_Config_Schema.parse(config);
};

export const defineYoutube = <const Slug extends string>(
  config: Omit<ContentBlock_Youtube_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

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
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Youtube_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Youtube_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Youtube_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Youtube_Configurator = ReturnType<typeof defineYoutube>;
