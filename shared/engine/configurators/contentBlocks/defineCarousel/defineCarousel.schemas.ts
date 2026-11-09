import { z } from 'zod';

import { createContentBlockMetaSchema, contentBlockLocalizationSwitch } from '../contentBlock.schemas';

function createCarouselSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];
  const slide = z.object({
    src: localized,
    alt: localized,
    caption: localized.optional(),
  });

  return z.object({
    ...createContentBlockMetaSchema('carousel').shape,
    title: localized.optional(),
    slides: z.tuple([slide], slide),
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
}

export const carousel_Config_Schema = createCarouselSchema('config');
export type ContentBlock_Carousel_Config = z.infer<typeof carousel_Config_Schema>;

export const carousel_Props_Schema = createCarouselSchema('props');
export type ContentBlock_Carousel_Props = z.infer<typeof carousel_Props_Schema>;
