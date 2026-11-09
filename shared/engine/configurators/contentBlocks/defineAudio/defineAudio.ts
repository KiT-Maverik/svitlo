import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { audio_Config_Schema, type ContentBlock_Audio_Config } from './defineAudio.schemas';

export function defineAudio<const Slug extends string>(config: Omit<ContentBlock_Audio_Config, 'slug'> & { slug: Slug }) {
  audio_Config_Schema.parse(config);

  const { id, type, slug, fileLocation, title, description, fallback } = config;

  const base = {
    id,
    type,
    slug,
    ...onlyStrings({ fileLocation, title, description, fallback }),
  } satisfies DeepPartial<ContentBlock_Audio_Config>;

  return {
    config: {
      base,
      locales: () =>
        onlyLocales({ fileLocation, title, description, fallback }) satisfies DeepPartial<ContentBlock_Audio_Config>,
    },
  };
}

export type ContentBlock_Audio_Configurator = ReturnType<typeof defineAudio>;
