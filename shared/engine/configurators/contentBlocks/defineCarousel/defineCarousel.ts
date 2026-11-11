import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared__configurators';

import {
  carousel_Config_Schema,
  type ContentBlock_Carousel_Config,
  type ContentBlock_Carousel_Locale,
} from './defineCarousel.schemas';

const validate = (config: ContentBlock_Carousel_Config) => {
  carousel_Config_Schema.parse(config);
};

export const defineCarousel = <const Slug extends string>(
  config: Omit<ContentBlock_Carousel_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

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
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Carousel_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Carousel_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Carousel_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Carousel_Configurator = ReturnType<typeof defineCarousel>;
