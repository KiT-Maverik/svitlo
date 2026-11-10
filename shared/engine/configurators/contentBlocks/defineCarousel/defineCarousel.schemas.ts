import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch,  } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

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

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode].optional(),
  slides: z.array(z.object({
    src: localizationSwitch[mode],
    alt: localizationSwitch[mode],
    caption: localizationSwitch[mode].optional(),
  })).min(1),
});
export type ContentBlock_Carousel_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const carousel_Config_Schema = carouselBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Carousel_Config = z.infer<typeof carousel_Config_Schema>;

export const carousel_Props_Schema = carouselBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Carousel_Props = z.infer<typeof carousel_Props_Schema>;
