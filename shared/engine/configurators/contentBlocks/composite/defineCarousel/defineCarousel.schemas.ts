import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import {
  validateSlugAddressedContainer,
  type SafePlacementMap,
} from '../../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import type { ConfiguratorChild } from '../../../../types/configuratorChild';
import { createContentBlockBaseSchema, localizationSwitch } from '../../contentBlock.schemas';
import type { ContentBlock_Image_Configurator } from '../../primitive/defineImage/defineImage';
import { image_Data_Schema } from '../../primitive/defineImage/defineImage.schemas';
import type { ContentBlock_Scene_Configurator } from '../../primitive/defineScene/defineScene';
import { scene_Data_Schema } from '../../primitive/defineScene/defineScene.schemas';

export type ContentBlock_Carousel_SlideConfigurator = ConfiguratorChild<
  ContentBlock_Image_Configurator | ContentBlock_Scene_Configurator
>;

/** Carousel is Composite, but its directly placed slides are Image or Scene only. */
export const carouselSlideTypes = ['image', 'scene'] as const;
export const carousel_Slide_Data_Schema = z.discriminatedUnion('type', [image_Data_Schema, scene_Data_Schema]);
export type ContentBlock_Carousel_SlideData = z.infer<typeof carousel_Slide_Data_Schema>;

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
const dataLocale = { title: localizationSwitch.data.optional() };

export type ContentBlock_Carousel_Locale<Mode extends 'config' | 'data'> = Mode extends 'config'
  ? z.infer<z.ZodObject<typeof configLocale>>
  : z.infer<z.ZodObject<typeof dataLocale>>;

/** Own metadata is strict: slide collection fields are never Carousel locale values. */
export const carousel_Metadata_Config_Schema = carouselBase.extend({
  locale: z.object(configLocale).strict(),
});

/** Direct root placements are kept as configurators and ordered by children. */
export const carousel_Config_Schema = carousel_Metadata_Config_Schema
  .extend({ children: z.array(z.string()) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, carouselSlideTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type ContentBlock_Carousel_Config = z.infer<typeof carousel_Config_Schema>;

export type Carousel_Metadata_Overrides = DeepPartial<
  Pick<ContentBlock_Carousel_Config, 'params' | 'locale'>
>;
export const carousel_Override_Config_Schema: z.ZodType<Carousel_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: carousel_Metadata_Config_Schema.shape.params,
      locale: carousel_Metadata_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentBlock_Carousel_Overrides<
  Items extends Record<string, ContentBlock_Carousel_SlideConfigurator>,
  Added extends Record<string, ContentBlock_Carousel_SlideConfigurator> = {},
> = Carousel_Metadata_Overrides & {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false } &
  Added & SafePlacementMap<Added> & { [Key in keyof Items & keyof Added]?: never };

export type ContentBlock_Carousel_DataBase = z.infer<typeof carouselBase> & {
  locale?: DeepPartial<ContentBlock_Carousel_Locale<'data'>>;
  children: string[];
  [placementSlug: string]: unknown;
};

/**
 * Canonical Data is slug-addressed. UI-specific slides[] belong only to
 * the later Props assembly boundary (#912/#913), not Config or Data.
 */
export const carousel_Data_Schema = carouselBase
  .extend({
    locale: z.object(dataLocale).strict().optional(),
    children: z.array(z.string()),
  })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, carouselSlideTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
    for (const key of value.children) {
      const child = value[key];
      if (child === undefined || child === false) continue;
      const parsed = carousel_Slide_Data_Schema.safeParse(child);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          ctx.addIssue({
            code: 'custom',
            path: [key, ...issue.path],
            message: issue.message,
          });
        }
      }
    }
  });
export type ContentBlock_Carousel_Data = z.infer<typeof carousel_Data_Schema>;
