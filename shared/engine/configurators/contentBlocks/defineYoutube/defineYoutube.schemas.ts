import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch,  } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

const contentBlockBase = createContentBlockBaseSchema('youtube');

const params = contentBlockBase.shape.params.extend({
  mode: z.enum(['link', 'embed']),
});

const youtubeBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  href: localizationSwitch[mode],
  title: localizationSwitch[mode].optional(),
  hint: localizationSwitch[mode].optional(),
  fallback: z.object({
    offline: localizationSwitch[mode].optional(),
    unavailable: localizationSwitch[mode].optional(),
    retry: localizationSwitch[mode].optional(),
  }).optional(),
});
export type ContentBlock_Youtube_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const youtube_Config_Schema = youtubeBase.extend(addUnifiedLocale(locale('config'))).refine(value => value.params.mode === 'link' || value.locale.title !== undefined || value.locale.hint !== undefined, {
    message: 'Embedded video requires title or hint',
  });
export type ContentBlock_Youtube_Config = z.infer<typeof youtube_Config_Schema>;

export const youtube_Props_Schema = youtubeBase.extend(addUnifiedLocale(locale('props'))).refine(value => value.params.mode === 'link' || value.locale.title !== undefined || value.locale.hint !== undefined, {
    message: 'Embedded video requires title or hint',
  });
export type ContentBlock_Youtube_Props = z.infer<typeof youtube_Props_Schema>;
