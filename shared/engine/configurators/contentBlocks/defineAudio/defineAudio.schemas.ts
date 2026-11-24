import { z } from 'zod';

import { audioMediaReference_Schema, deepStrict_Schema, localizedMediaReference_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import type { Configurator_Mode } from '../../configurator.schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../contentBlock.schemas';

const contentBlockBase = createContentBlockBaseSchema('audio');

const params = contentBlockBase.shape.params.extend({});

const audioBase = contentBlockBase.extend({ params });

const configLocale = {
  fileName: localizedMediaReference_Schema(audioMediaReference_Schema),
  title: localizationSwitch.config,
  description: localizationSwitch.config.optional(),
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
  fileLocation: localizationSwitch.props,
  title: localizationSwitch.props,
  description: localizationSwitch.props.optional(),
  fallback: z
    .object({
      offline: localizationSwitch.props.optional(),
      unavailable: localizationSwitch.props.optional(),
      playbackError: localizationSwitch.props.optional(),
      retry: localizationSwitch.props.optional(),
    })
    .optional(),
};
export type ContentBlock_Audio_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<Mode extends 'config' ? typeof configLocale : typeof propsLocale>
>;

export const audio_Config_Schema = audioBase.extend(addUnifiedLocale(configLocale));
export type ContentBlock_Audio_Config = z.infer<typeof audio_Config_Schema>;

/** Sparse overrides derive permitted fields directly from the authored Config Schema. */
export type ContentBlock_Audio_Overrides = DeepPartial<Pick<ContentBlock_Audio_Config, 'params' | 'locale'>>;

export const audio_Override_Config_Schema: z.ZodType<ContentBlock_Audio_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: audio_Config_Schema.shape.params,
      locale: audio_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentBlock_Audio_PropsBase = z.infer<typeof audioBase> & {
  locale?: DeepPartial<ContentBlock_Audio_Locale<'props'>>;
};

export const audio_Props_Schema = audioBase.extend(addUnifiedLocale(propsLocale));
export type ContentBlock_Audio_Props = z.infer<typeof audio_Props_Schema>;
