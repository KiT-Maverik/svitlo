import { z } from 'zod';

import { createContentBlockMetaSchema, contentBlockLocalizationSwitch } from '../contentBlock.schemas';

function createVideoSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];

  return z.object({
    ...createContentBlockMetaSchema('video').shape,
    fileLocation: localized,
    poster: localized,
    title: localized.optional(),
    fallback: z.object({
      offline: localized.optional(),
      unavailable: localized.optional(),
      playbackError: localized.optional(),
      retry: localized.optional(),
    }).optional(),
  });
}

export const video_Config_Schema = createVideoSchema('config');
export type ContentBlock_Video_Config = z.infer<typeof video_Config_Schema>;

export const video_Props_Schema = createVideoSchema('props');
export type ContentBlock_Video_Props = z.infer<typeof video_Props_Schema>;
