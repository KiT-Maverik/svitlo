import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import type { ConfiguratorChild } from '../../../../types/configuratorChild';
import { createContentBlockBaseSchema, localizationSwitch } from '../../contentBlock.schemas';
import type { ContentBlock_Image_Configurator } from '../../primitive/defineImage/defineImage';
import { image_Props_Schema } from '../../primitive/defineImage/defineImage.schemas';
import type { ContentBlock_Scene_Configurator } from '../../primitive/defineScene/defineScene';
import { scene_Props_Schema } from '../../primitive/defineScene/defineScene.schemas';

export type ContentBlock_Carousel_SlideConfigurator = ConfiguratorChild<
  ContentBlock_Image_Configurator | ContentBlock_Scene_Configurator
>;

/** Carousel's narrower child policy; shared by direct Zod and Build validation. */
export const carouselSlideTypes = ['image', 'scene'] as const;
const carouselSlideConfigurator_Schema = z.custom<ContentBlock_Carousel_SlideConfigurator>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    carouselSlideTypes.some(type => type === value.type),
  { message: 'Carousel slides accept only Image or Scene configurators' },
);

/** Carousel children retain the complete, type-discriminated ContentBlock Props contract. */
export const carousel_Slide_Props_Schema = z.discriminatedUnion('type', [image_Props_Schema, scene_Props_Schema]);
export type ContentBlock_Carousel_SlideProps = z.infer<typeof carousel_Slide_Props_Schema>;

const contentBlockBase = createContentBlockBaseSchema('carousel');
const params = contentBlockBase.shape.params.extend({
  aspectRatio: z.number().positive().optional(),
  objectFit: z.enum(['cover', 'contain']).optional(),
  loop: z.boolean().optional(),
  autoplay: z.boolean().optional(),
  autoplayIntervalMs: z.number().positive().optional(),
  transition: z.enum(['slide', 'fade']).optional(),
  transitionDurationMs: z.number().positive().optional(),
  showArrows: z.boolean().optional(),
  showIndicators: z.boolean().optional(),
  allowFullscreen: z.boolean().optional(),
  allowSwipe: z.boolean().optional(),
  startIndex: z.number().int().nonnegative().optional(),
  pauseOnHover: z.boolean().optional(),
});
const carouselBase = contentBlockBase.extend({ params });
const configLocale = { title: localizationSwitch.config.optional() };
const propsLocale = {
  title: localizationSwitch.props.optional(),
  slides: z.array(carousel_Slide_Props_Schema).min(1),
};

export type ContentBlock_Carousel_Locale<Mode extends 'config' | 'props'> = Mode extends 'config'
  ? z.infer<z.ZodObject<typeof configLocale>>
  : z.infer<z.ZodObject<typeof propsLocale>>;

export const carousel_Config_Schema = carouselBase.extend({
  ...addUnifiedLocale(configLocale),
  slides: z.object({
    items: z.record(z.string(), carouselSlideConfigurator_Schema),
    order: z.array(z.string()),
  }),
});
export type ContentBlock_Carousel_Config = z.infer<typeof carousel_Config_Schema>;

export type Carousel_Metadata_Overrides = DeepPartial<Pick<ContentBlock_Carousel_Config, 'params' | 'locale'>>;
export const carousel_Override_Config_Schema: z.ZodType<Carousel_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: carousel_Config_Schema.shape.params,
      locale: carousel_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentBlock_Carousel_Overrides<
  Items extends Record<string, ContentBlock_Carousel_SlideConfigurator> = Record<
    string,
    ContentBlock_Carousel_SlideConfigurator
  >,
  Added extends Record<string, ContentBlock_Carousel_SlideConfigurator> = {},
> = Carousel_Metadata_Overrides & {
  slides?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};

export type ContentBlock_Carousel_PropsBase = z.infer<typeof carouselBase> & {
  locale?: DeepPartial<ContentBlock_Carousel_Locale<'props'>>;
};

export const carousel_Props_Schema = carouselBase.extend(addUnifiedLocale(propsLocale));
export type ContentBlock_Carousel_Props = z.infer<typeof carousel_Props_Schema>;
