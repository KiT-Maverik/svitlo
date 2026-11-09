import type { DeepPartial } from '#types';

import { image_Config_Schema, type ContentBlock_Image_Config } from './defineImage.schemas';

export function defineImage<const Slug extends string>(config: Omit<ContentBlock_Image_Config, 'slug'> & { slug: Slug }) {
  image_Config_Schema.parse(config);

  const { id, type, slug, src, alt, caption, fallback, ...layout } = config;

  const base = {
    id,
    type,
    slug,
    ...layout,
    src: typeof src === 'string' ? src : undefined,
    alt: typeof alt === 'string' ? alt : undefined,
    caption: typeof caption === 'string' ? caption : undefined,
    fallback: fallback && {
      offline: typeof fallback.offline === 'string' ? fallback.offline : undefined,
      unavailable: typeof fallback.unavailable === 'string' ? fallback.unavailable : undefined,
      retry: typeof fallback.retry === 'string' ? fallback.retry : undefined,
    },
  } satisfies DeepPartial<ContentBlock_Image_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          src: typeof src === 'object' ? src : undefined,
          alt: typeof alt === 'object' ? alt : undefined,
          caption: typeof caption === 'object' ? caption : undefined,
          fallback: fallback && {
            offline: typeof fallback.offline === 'object' ? fallback.offline : undefined,
            unavailable: typeof fallback.unavailable === 'object' ? fallback.unavailable : undefined,
            retry: typeof fallback.retry === 'object' ? fallback.retry : undefined,
          },
        }) satisfies DeepPartial<ContentBlock_Image_Config>,
    },
  };
}

export type ContentBlock_Image_Configurator = ReturnType<typeof defineImage>;
