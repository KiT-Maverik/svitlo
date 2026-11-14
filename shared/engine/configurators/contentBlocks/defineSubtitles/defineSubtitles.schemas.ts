import { z } from 'zod';
import { deepStrict_Schema } from '#schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../contentBlock.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';

const kind = createContentBlockBaseSchema('subtitles');
export const subtitles_Config_Schema = kind
  .extend({
    ...addUnifiedLocale({ fileLocation: localizationSwitch.config }),
  })
  .strict();
export const subtitles_Props_Schema = kind
  .extend({
    ...addUnifiedLocale({ fileLocation: localizationSwitch.props }),
  })
  .strict();
export type ContentBlock_Subtitles_Config = z.infer<typeof subtitles_Config_Schema>;
export type ContentBlock_Subtitles_Props = z.infer<typeof subtitles_Props_Schema>;
export const subtitles_Override_Config_Schema = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: subtitles_Config_Schema.shape.params,
      locale: subtitles_Config_Schema.shape.locale,
    }),
  ),
);
export type ContentBlock_Subtitles_Overrides = z.infer<typeof subtitles_Override_Config_Schema>;
