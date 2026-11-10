import { z } from 'zod';

import {disabledParam_Schema} from "#schemas";

import {
  createContentBlockMetaSchema,
  localizationSwitch,
  textStylingRules_Schema,
} from '../_shared';
import {Configurator_Mode} from "../../configurator.schemas";

const base = z.object({
  ...createContentBlockMetaSchema('text').shape,
  params: z.object({
    ...textStylingRules_Schema.shape,
    wrap: z.object({
      enabled: z.literal(true),
      typographyProps: z.unknown().optional(),
    }).optional(),
  }),
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  value: localizationSwitch[mode],
});
export type ContentBlock_Text_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;

export const text_Config_Schema = base.extend(locale('config'));
export type ContentBlock_Text_Config = z.infer<typeof text_Config_Schema>;

export const text_Props_Schema = base.extend({
  params: base.shape.params.extend(disabledParam_Schema.shape),
}).extend(locale('props'));
export type ContentBlock_Text_Props = z.infer<typeof text_Props_Schema>;
