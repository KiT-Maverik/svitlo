import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('image');

const params = contentBlockBase.shape.params.extend({
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  fill: z.boolean().optional(),
  aspectRatio: z.number().positive().optional(),
  objectFit: z.enum(['contain', 'cover']).optional(),
  sizes: z.string().optional(),
  unoptimized: z.boolean().optional(),
});

const imageBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  src: localizationSwitch[mode],
  alt: localizationSwitch[mode],
  caption: localizationSwitch[mode].optional(),
  fallback: z
    .object({
      offline: localizationSwitch[mode].optional(),
      unavailable: localizationSwitch[mode].optional(),
      retry: localizationSwitch[mode].optional(),
    })
    .optional(),
});
export type ContentBlock_Image_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const image_Config_Schema = imageBase
  .extend(addUnifiedLocale(locale('config')))
  .refine(
    value =>
      value.params.fill
        ? value.params.aspectRatio !== undefined
        : value.params.width !== undefined && value.params.height !== undefined,
    {
      message: 'Image requires either fill/aspectRatio or width/height',
    },
  );
export type ContentBlock_Image_Config = z.infer<typeof image_Config_Schema>;

export const image_Props_Schema = imageBase
  .extend(addUnifiedLocale(locale('props')))
  .refine(
    value =>
      value.params.fill
        ? value.params.aspectRatio !== undefined
        : value.params.width !== undefined && value.params.height !== undefined,
    {
      message: 'Image requires either fill/aspectRatio or width/height',
    },
  );
export type ContentBlock_Image_Props = z.infer<typeof image_Props_Schema>;
