import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch,  } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

const contentBlockBase = createContentBlockBaseSchema('audio');
const params = contentBlockBase.shape.params.extend({
  
});
const audioBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  fileLocation: localizationSwitch[mode],
  title: localizationSwitch[mode],
  description: localizationSwitch[mode].optional(),
  fallback: z.object({
    offline: localizationSwitch[mode].optional(),
    unavailable: localizationSwitch[mode].optional(),
    playbackError: localizationSwitch[mode].optional(),
    retry: localizationSwitch[mode].optional(),
  }).optional(),
});
export type ContentBlock_Audio_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const audio_Config_Schema = audioBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Audio_Config = z.infer<typeof audio_Config_Schema>;

export const audio_Props_Schema = audioBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Audio_Props = z.infer<typeof audio_Props_Schema>;
