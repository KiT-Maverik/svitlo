import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
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

/** Sparse overrides derive permitted fields directly from the authored Config Schema. */
export type ContentBlock_Image_Overrides = DeepPartial<Pick<ContentBlock_Image_Config, 'params' | 'locale'>>;

export const image_Override_Config_Schema: z.ZodType<ContentBlock_Image_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: image_Config_Schema.shape.params,
      locale: image_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentBlock_Image_ResourceBase = z.infer<typeof imageBase> & {
  locale?: DeepPartial<ContentBlock_Image_Locale<'props'>>;
};

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
