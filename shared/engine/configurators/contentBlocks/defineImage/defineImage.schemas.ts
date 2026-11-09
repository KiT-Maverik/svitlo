import { z } from 'zod';

import { createContentBlockMetaSchema, contentBlockLocalizationSwitch } from '../contentBlock.schemas';

function createImageSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];

  return z
    .object({
      ...createContentBlockMetaSchema('image').shape,
      src: localized,
      alt: localized,
      caption: localized.optional(),
      width: z.number().positive().optional(),
      height: z.number().positive().optional(),
      fill: z.boolean().optional(),
      aspectRatio: z.number().positive().optional(),
      objectFit: z.enum(['contain', 'cover']).optional(),
      sizes: z.string().optional(),
      unoptimized: z.boolean().optional(),
      fallback: z
        .object({
          offline: localized.optional(),
          unavailable: localized.optional(),
          retry: localized.optional(),
        })
        .optional(),
    })
    .refine(
      value => (value.fill ? value.aspectRatio !== undefined : value.width !== undefined && value.height !== undefined),
      { message: 'Image requires either fill/aspectRatio or width/height' },
    );
}

export const image_Config_Schema = createImageSchema('config');
export type ContentBlock_Image_Config = z.infer<typeof image_Config_Schema>;

export const image_Props_Schema = createImageSchema('props');
export type ContentBlock_Image_Props = z.infer<typeof image_Props_Schema>;
