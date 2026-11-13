import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../contentBlock.schemas';

import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';

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

/** Sparse overrides derive permitted fields directly from the authored Config Schema. */
export type ContentBlock_Video_Overrides = DeepPartial<Pick<ContentBlock_Video_Config, 'params' | 'locale'>>;

export const video_Override_Config_Schema: z.ZodType<ContentBlock_Video_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: video_Config_Schema.shape.params,
      locale: video_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentBlock_Video_PropsBase = z.infer<typeof videoBase> & {
  locale?: DeepPartial<ContentBlock_Video_Locale<'props'>>;
};

export const video_Props_Schema = videoBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Video_Props = z.infer<typeof video_Props_Schema>;
