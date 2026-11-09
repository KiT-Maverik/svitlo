import { z } from 'zod';

import { createContentBlockMetaSchema, contentBlockLocalizationSwitch } from '../contentBlock.schemas';

function createAudioSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];

  return z.object({
    ...createContentBlockMetaSchema('audio').shape,
    fileLocation: localized,
    title: localized,
    description: localized.optional(),
    fallback: z
      .object({
        offline: localized.optional(),
        unavailable: localized.optional(),
        playbackError: localized.optional(),
        retry: localized.optional(),
      })
      .optional(),
  });
}

export const audio_Config_Schema = createAudioSchema('config');
export type ContentBlock_Audio_Config = z.infer<typeof audio_Config_Schema>;

export const audio_Props_Schema = createAudioSchema('props');
export type ContentBlock_Audio_Props = z.infer<typeof audio_Props_Schema>;
