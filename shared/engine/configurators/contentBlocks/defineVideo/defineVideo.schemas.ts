import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('video');

const params = contentBlockBase.shape.params.extend({});

const videoBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  fileLocation: localizationSwitch[mode],
  poster: localizationSwitch[mode],
  // Optional visible title, separate from the video player label.
  title: localizationSwitch[mode].optional(),
  // Required accessible name for the video player and fallback.
  label: localizationSwitch[mode],
  fallback: z
    .object({
      offline: localizationSwitch[mode].optional(),
      unavailable: localizationSwitch[mode].optional(),
      playbackError: localizationSwitch[mode].optional(),
      retry: localizationSwitch[mode].optional(),
    })
    .optional(),
});
export type ContentBlock_Video_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const video_Config_Schema = videoBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Video_Config = z.infer<typeof video_Config_Schema>;

export const video_Props_Schema = videoBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Video_Props = z.infer<typeof video_Props_Schema>;
