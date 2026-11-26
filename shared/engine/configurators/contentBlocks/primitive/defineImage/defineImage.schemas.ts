import { z } from 'zod';

import { deepStrict_Schema, imageMediaReference_Schema, localizedMediaReference_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import type { Configurator_Mode } from '../../../configurator.schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../../contentBlock.schemas';

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

const configLocale = {
  fileName: localizedMediaReference_Schema(imageMediaReference_Schema),
  alt: localizationSwitch.config,
  caption: localizationSwitch.config.optional(),
  fallback: z
    .object({
      offline: localizationSwitch.config.optional(),
      unavailable: localizationSwitch.config.optional(),
      retry: localizationSwitch.config.optional(),
    })
    .optional(),
};
const propsLocale = {
  src: localizationSwitch.props,
  alt: localizationSwitch.props,
  caption: localizationSwitch.props.optional(),
  fallback: z
    .object({
      offline: localizationSwitch.props.optional(),
      unavailable: localizationSwitch.props.optional(),
      retry: localizationSwitch.props.optional(),
    })
    .optional(),
};
export type ContentBlock_Image_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<Mode extends 'config' ? typeof configLocale : typeof propsLocale>
>;

export const image_Config_Schema = imageBase
  .extend(addUnifiedLocale(configLocale))
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

export type ContentBlock_Image_PropsBase = z.infer<typeof imageBase> & {
  locale?: DeepPartial<ContentBlock_Image_Locale<'props'>>;
};

export const image_Props_Schema = imageBase
  .extend(addUnifiedLocale(propsLocale))
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
