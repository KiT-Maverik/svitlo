import type { DeepPartial } from '#types';

import { carousel_Config_Schema, type ContentBlock_Carousel_Config } from './defineCarousel.schemas';

export function defineCarousel<const Slug extends string>(
  config: Omit<ContentBlock_Carousel_Config, 'slug'> & { slug: Slug },
) {
  carousel_Config_Schema.parse(config);

  const { id, type, slug, title, slides, ...params } = config;
  const base = {
    id,
    type,
    slug,
    ...params,
    title: typeof title === 'string' ? title : undefined,
    slides: slides.map(({ src, alt, caption }) => ({
      src: typeof src === 'string' ? src : undefined,
      alt: typeof alt === 'string' ? alt : undefined,
      caption: typeof caption === 'string' ? caption : undefined,
    })),
  } satisfies DeepPartial<ContentBlock_Carousel_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          title: typeof title === 'object' ? title : undefined,
          slides: slides.map(({ src, alt, caption }) => ({
            src: typeof src === 'object' ? src : undefined,
            alt: typeof alt === 'object' ? alt : undefined,
            caption: typeof caption === 'object' ? caption : undefined,
          })),
        }) satisfies DeepPartial<ContentBlock_Carousel_Config>,
    },
  };
}

export type ContentBlock_Carousel_Configurator = ReturnType<typeof defineCarousel>;
