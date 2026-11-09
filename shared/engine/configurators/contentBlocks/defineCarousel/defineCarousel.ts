import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { carousel_Config_Schema, type ContentBlock_Carousel_Config } from './defineCarousel.schemas';

export function defineCarousel<const Slug extends string>(
  config: Omit<ContentBlock_Carousel_Config, 'slug'> & { slug: Slug },
) {
  carousel_Config_Schema.parse(config);

  const { id, type, slug, title, slides, ...params } = config;

  const localeEntries = { title, slides } as const;

  const base = {
    id,
    type,
    slug,
    ...params,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Carousel_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Carousel_Config>,
    },
  };
}

export type ContentBlock_Carousel_Configurator = ReturnType<typeof defineCarousel>;
