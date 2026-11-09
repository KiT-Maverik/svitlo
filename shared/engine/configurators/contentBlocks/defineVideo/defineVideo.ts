import type { DeepPartial } from '#types';

import { video_Config_Schema, type ContentBlock_Video_Config } from './defineVideo.schemas';

export function defineVideo<const Slug extends string>(config: Omit<ContentBlock_Video_Config, 'slug'> & { slug: Slug }) {
  video_Config_Schema.parse(config);

  const { id, type, slug, fileLocation, poster, title, fallback } = config;
  const base = {
    id,
    type,
    slug,
    fileLocation: typeof fileLocation === 'string' ? fileLocation : undefined,
    poster: typeof poster === 'string' ? poster : undefined,
    title: typeof title === 'string' ? title : undefined,
    fallback: fallback && {
      offline: typeof fallback.offline === 'string' ? fallback.offline : undefined,
      unavailable: typeof fallback.unavailable === 'string' ? fallback.unavailable : undefined,
      playbackError: typeof fallback.playbackError === 'string' ? fallback.playbackError : undefined,
      retry: typeof fallback.retry === 'string' ? fallback.retry : undefined,
    },
  } satisfies DeepPartial<ContentBlock_Video_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          fileLocation: typeof fileLocation === 'object' ? fileLocation : undefined,
          poster: typeof poster === 'object' ? poster : undefined,
          title: typeof title === 'object' ? title : undefined,
          fallback: fallback && {
            offline: typeof fallback.offline === 'object' ? fallback.offline : undefined,
            unavailable: typeof fallback.unavailable === 'object' ? fallback.unavailable : undefined,
            playbackError: typeof fallback.playbackError === 'object' ? fallback.playbackError : undefined,
            retry: typeof fallback.retry === 'object' ? fallback.retry : undefined,
          },
        }) satisfies DeepPartial<ContentBlock_Video_Config>,
    },
  };
}

export type ContentBlock_Video_Configurator = ReturnType<typeof defineVideo>;
