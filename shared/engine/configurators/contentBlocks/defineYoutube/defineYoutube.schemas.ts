import { z } from 'zod';

import { createContentBlockMetaSchema, contentBlockLocalizationSwitch } from '../contentBlock.schemas';

function createYoutubeSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];
  return z.object({
    ...createContentBlockMetaSchema('youtube').shape,
    href: localized,
    mode: z.enum(['link', 'embed']),
    title: localized.optional(),
    hint: localized.optional(),
    fallback: z.object({
      offline: localized.optional(),
      unavailable: localized.optional(),
      retry: localized.optional(),
    }).optional(),
  }).refine(value => value.mode === 'link' || value.title !== undefined || value.hint !== undefined, {
    message: 'Embedded video requires title or hint',
  });
}

export const youtube_Config_Schema = createYoutubeSchema('config');
export type ContentBlock_Youtube_Config = z.infer<typeof youtube_Config_Schema>;

export const youtube_Props_Schema = createYoutubeSchema('props');
export type ContentBlock_Youtube_Props = z.infer<typeof youtube_Props_Schema>;
