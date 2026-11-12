import { z } from 'zod';

import { createContentBlockBaseSchema, localizationSwitch, textVariables_Schema } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('text');

const params = contentBlockBase.shape.params.extend({
  ...textVariables_Schema.shape,
  wrap: z
    .object({
      enabled: z.literal(true),
      // MUI Typography props belong to the consuming app; Engine stays independent of MUI.
      // The app validates this value, so Engine deliberately accepts it as unknown.
      typographyProps: z.unknown().optional(),
    })
    .optional(),
});

const textBase = contentBlockBase.extend({
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  value: localizationSwitch[mode],
});
export type ContentBlock_Text_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const text_Config_Schema = textBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Text_Config = z.infer<typeof text_Config_Schema>;

/** Validate Text override metadata strictly without changing the authored config schema. */
export const text_Override_Config_Schema = text_Config_Schema
  .extend({
    params: text_Config_Schema.shape.params
      .extend({
        wrap: text_Config_Schema.shape.params.shape.wrap.unwrap().strict().optional(),
      })
      .strict(),
    locale: text_Config_Schema.shape.locale.strict(),
  })
  .strict();

/** Required nonlocalized fields come from the Text base schema. */
export type ContentBlock_Text_ResourceBase = z.infer<typeof textBase> & {
  locale?: Partial<ContentBlock_Text_Locale<'props'>>;
};

export const text_Props_Schema = textBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Text_Props = z.infer<typeof text_Props_Schema>;
