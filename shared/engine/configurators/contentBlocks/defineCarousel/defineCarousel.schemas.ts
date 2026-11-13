import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';

import { createContentBlockBaseSchema, localizationSwitch } from '../contentBlock.schemas';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { carouselSlide_Published_Schema } from './defineCarouselSlide/defineCarouselSlide.schemas';
import type { ContentBlock_CarouselSlide_Fields } from './defineCarouselSlide/defineCarouselSlide.schemas';
import type { ContentBlock_CarouselSlide_Configurator } from './defineCarouselSlide/defineCarouselSlide';

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
  slides: z.array(carouselSlide_Published_Schema).min(1),
};

export type ContentBlock_Carousel_Locale<Mode extends 'config' | 'props'> = Mode extends 'config'
  ? z.infer<z.ZodObject<typeof configLocale>>
  : z.infer<z.ZodObject<typeof propsLocale>>;

/** Authored slides are named configurators, not positional entries in locale. */
export const carousel_Config_Schema = carouselBase.extend({
  ...addUnifiedLocale(configLocale),
  slides: z.object({
    // Parent validate() owns kind, matching slug and ordered collection checks.
    items: z.record(z.string(), z.custom<ContentBlock_CarouselSlide_Configurator>()),
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
  Items extends Record<string, ContentBlock_CarouselSlide_Configurator> = Record<
    string,
    ContentBlock_CarouselSlide_Configurator
  >,
  Added extends Record<string, ContentBlock_CarouselSlide_Configurator> = {},
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
export type ContentBlock_Carousel_SlideProps = ContentBlock_CarouselSlide_Fields;
