import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { identityBase_Schema } from '../../../_shared__configurators/common.schemas';
import { localizationSwitch } from '../../_shared__contentBlocks';

const base = identityBase_Schema.extend({ type: z.literal('carouselSlide') });

const authoredLocale = z.object({
  src: localizationSwitch.config,
  alt: localizationSwitch.config,
  caption: localizationSwitch.config.optional(),
});

export const carouselSlide_Config_Schema = base.extend({ locale: authoredLocale });
export type ContentBlock_CarouselSlide_Config = z.infer<typeof carouselSlide_Config_Schema>;

export type ContentBlock_CarouselSlide_Overrides = DeepPartial<Pick<ContentBlock_CarouselSlide_Config, 'locale'>>;
export const carouselSlide_Override_Config_Schema: z.ZodType<ContentBlock_CarouselSlide_Overrides> = z.deepPartial(
  deepStrict_Schema(z.object({ locale: carouselSlide_Config_Schema.shape.locale })),
);

/** A slide is an authored configurator, but UI Carousel slides are plain field objects. */
export const carouselSlide_Published_Schema = z.object({
  src: localizationSwitch.props,
  alt: localizationSwitch.props,
  caption: localizationSwitch.props.optional(),
});
export type ContentBlock_CarouselSlide_Fields = z.infer<typeof carouselSlide_Published_Schema>;

export const carouselSlide_Props_Schema = base.extend({ locale: carouselSlide_Published_Schema });
export type ContentBlock_CarouselSlide_Props = z.infer<typeof carouselSlide_Props_Schema>;
