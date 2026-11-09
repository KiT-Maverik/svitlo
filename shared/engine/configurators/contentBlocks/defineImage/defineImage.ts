import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { image_Config_Schema, type ContentBlock_Image_Config } from './defineImage.schemas';

export function defineImage<const Slug extends string>(config: Omit<ContentBlock_Image_Config, 'slug'> & { slug: Slug }) {
  image_Config_Schema.parse(config);

  const { id, type, slug, src, alt, caption, fallback, ...layout } = config;

  const base = {
    id,
    type,
    slug,
    ...layout,
    ...onlyStrings({ src, alt, caption, fallback }),
  } satisfies DeepPartial<ContentBlock_Image_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales({ src, alt, caption, fallback }) satisfies DeepPartial<ContentBlock_Image_Config>,
    },
  };
}

export type ContentBlock_Image_Configurator = ReturnType<typeof defineImage>;
