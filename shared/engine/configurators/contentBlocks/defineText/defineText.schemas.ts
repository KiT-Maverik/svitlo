import { z } from 'zod';

import {disabledParam_Schema} from "#schemas";

import {
  createContentBlockMetaSchema,
  localizationSwitch,
  textStylingRules_Schema,
} from '../_shared';

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

export const text_Config_Schema = base.extend({
  value: localizationSwitch.config,
});
export type ContentBlock_Text_Config = z.infer<typeof text_Config_Schema>;

export const text_Props_Schema = base.extend({
  params: base.shape.params.extend(disabledParam_Schema.shape),
  value: localizationSwitch.props,
});
export type ContentBlock_Text_Props = z.infer<typeof text_Props_Schema>;
