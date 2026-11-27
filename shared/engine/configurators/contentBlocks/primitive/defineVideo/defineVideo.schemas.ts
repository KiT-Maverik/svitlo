import { z } from 'zod';

import {
  deepStrict_Schema,
  imageMediaReference_Schema,
  localizedMediaReference_Schema,
  videoMediaReference_Schema,
} from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import type { Configurator_Mode } from '../../../configurator.schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../../contentBlock.schemas';

const contentBlockBase = createContentBlockBaseSchema('video');

const params = contentBlockBase.shape.params.extend({});

const videoBase = contentBlockBase.extend({ params });

const configLocale = {
  fileName: localizedMediaReference_Schema(videoMediaReference_Schema),
  posterFileName: localizedMediaReference_Schema(imageMediaReference_Schema),
  title: localizationSwitch.config.optional(),
  label: localizationSwitch.config,
  fallback: z
    .object({
      offline: localizationSwitch.config.optional(),
      unavailable: localizationSwitch.config.optional(),
      playbackError: localizationSwitch.config.optional(),
      retry: localizationSwitch.config.optional(),
    })
    .optional(),
};
const propsLocale = {
  fileLocation: localizationSwitch.data,
  poster: localizationSwitch.data,
  title: localizationSwitch.data.optional(),
  label: localizationSwitch.data,
  fallback: z
    .object({
      offline: localizationSwitch.data.optional(),
      unavailable: localizationSwitch.data.optional(),
      playbackError: localizationSwitch.data.optional(),
      retry: localizationSwitch.data.optional(),
    })
    .optional(),
};
export type ContentBlock_Video_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<Mode extends 'config' ? typeof configLocale : typeof propsLocale>
>;

export const video_Config_Schema = videoBase.extend(addUnifiedLocale(configLocale));
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

export type ContentBlock_Video_DataBase = z.infer<typeof videoBase> & {
  locale?: DeepPartial<ContentBlock_Video_Locale<'data'>>;
};

export const video_Data_Schema = videoBase.extend(addUnifiedLocale(propsLocale));
export type ContentBlock_Video_Data = z.infer<typeof video_Data_Schema>;
