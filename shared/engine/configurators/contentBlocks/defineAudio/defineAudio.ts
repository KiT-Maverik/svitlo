import type { DeepPartial } from '#types';

import { audio_Config_Schema, type ContentBlock_Audio_Config } from './defineAudio.schemas';
import {onlyStrings} from "../../_utils";

export function defineAudio<const Slug extends string>(config: Omit<ContentBlock_Audio_Config, 'slug'> & { slug: Slug }) {
  audio_Config_Schema.parse(config);

  const { id, type, slug, fileLocation, title, description, fallback } = config;
  const base = {
    id,
    type,
    slug,
    ...onlyStrings({
      fileLocation,
      title,
      description,
      fallback,
    }),
  } satisfies DeepPartial<ContentBlock_Audio_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          fileLocation: typeof fileLocation === 'object' ? fileLocation : undefined,
          title: typeof title === 'object' ? title : undefined,
          description: typeof description === 'object' ? description : undefined,
          fallback: fallback && {
            offline: typeof fallback.offline === 'object' ? fallback.offline : undefined,
            unavailable: typeof fallback.unavailable === 'object' ? fallback.unavailable : undefined,
            playbackError: typeof fallback.playbackError === 'object' ? fallback.playbackError : undefined,
            retry: typeof fallback.retry === 'object' ? fallback.retry : undefined,
          },
        }) satisfies DeepPartial<ContentBlock_Audio_Config>,
    },
  };
}

export type ContentBlock_Audio_Configurator = ReturnType<typeof defineAudio>;
