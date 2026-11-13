import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../contentBlock.schemas';

import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';

const contentBlockBase = createContentBlockBaseSchema('audio');

const params = contentBlockBase.shape.params.extend({});

const audioBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  fileLocation: localizationSwitch[mode],
  title: localizationSwitch[mode],
  description: localizationSwitch[mode].optional(),
  fallback: z
    .object({
      offline: localizationSwitch[mode].optional(),
      unavailable: localizationSwitch[mode].optional(),
      playbackError: localizationSwitch[mode].optional(),
      retry: localizationSwitch[mode].optional(),
    })
    .optional(),
});
export type ContentBlock_Audio_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const audio_Config_Schema = audioBase.extend(addUnifiedLocale(locale('config')));
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

export const audio_Props_Schema = audioBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Audio_Props = z.infer<typeof audio_Props_Schema>;
