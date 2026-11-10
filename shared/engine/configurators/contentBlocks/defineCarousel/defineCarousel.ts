import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';

import {
  carousel_Config_Schema,
  type ContentBlock_Carousel_Config,
  type ContentBlock_Carousel_Locale,
} from './defineCarousel.schemas';

export const defineCarousel = (config: ContentBlock_Carousel_Config) => {
  carousel_Config_Schema.parse(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Carousel_Config>;

  const overrides: DeepPartial<ContentBlock_Carousel_Config> = {};

  return {
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Carousel_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Carousel_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Carousel_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Carousel_Configurator = ReturnType<typeof defineCarousel>;
