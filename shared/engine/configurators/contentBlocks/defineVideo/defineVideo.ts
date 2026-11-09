import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { video_Config_Schema, type ContentBlock_Video_Config } from './defineVideo.schemas';

export function defineVideo<const Slug extends string>(config: Omit<ContentBlock_Video_Config, 'slug'> & { slug: Slug }) {
  video_Config_Schema.parse(config);

  const { id, type, slug, fileLocation, poster, title, fallback } = config;

  const base = {
    id,
    type,
    slug,
    ...onlyStrings({ fileLocation, poster, title, fallback }),
  } satisfies DeepPartial<ContentBlock_Video_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales({ fileLocation, poster, title, fallback }) satisfies DeepPartial<ContentBlock_Video_Config>,
    },
  };
}

export type ContentBlock_Video_Configurator = ReturnType<typeof defineVideo>;
