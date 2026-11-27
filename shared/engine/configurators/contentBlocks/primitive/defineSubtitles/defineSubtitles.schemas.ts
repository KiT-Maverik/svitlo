import { z } from 'zod';

import { deepStrict_Schema, localizedMediaReference_Schema, subtitlesMediaReference_Schema } from '#schemas';

import { addUnifiedLocale } from '../../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { createContentBlockBaseSchema, localizationSwitch } from '../../contentBlock.schemas';

const kind = createContentBlockBaseSchema('subtitles');
export const subtitles_Config_Schema = kind
  .extend({
    ...addUnifiedLocale({ fileName: localizedMediaReference_Schema(subtitlesMediaReference_Schema) }),
  })
  .strict();
export const subtitles_Data_Schema = kind
  .extend({
    ...addUnifiedLocale({ fileLocation: localizationSwitch.data }),
  })
  .strict();
export type ContentBlock_Subtitles_Config = z.infer<typeof subtitles_Config_Schema>;
export type ContentBlock_Subtitles_Data = z.infer<typeof subtitles_Data_Schema>;
export const subtitles_Override_Config_Schema = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: subtitles_Config_Schema.shape.params,
      locale: subtitles_Config_Schema.shape.locale,
    }),
  ),
);
export type ContentBlock_Subtitles_Overrides = z.infer<typeof subtitles_Override_Config_Schema>;
