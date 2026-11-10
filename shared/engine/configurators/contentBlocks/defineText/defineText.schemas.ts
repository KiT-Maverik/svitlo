import { z } from 'zod';

import {disabledParam_Schema} from "#schemas";

import {
  createContentBlockMetaSchema,
  localizationSwitch,
  textStylingRules_Schema,
} from '../_shared';
import {Configurator_Mode} from "../../configurator.schemas";

const createTextSchema = (mode: Configurator_Mode)=> {
  const localized = localizationSwitch[mode];

  return z.object({
    ...createContentBlockMetaSchema('text').shape,
    params: z.object({
      ...textStylingRules_Schema.shape,
      wrap: z.object({
        enabled: z.literal(true),
        typographyProps: z.unknown().optional(),
      }).optional(),
      ...(mode === 'props' ? disabledParam_Schema : {}),
    }),
    value: localized,
  });
}

export const text_Config_Schema = createTextSchema('config');
export type ContentBlock_Text_Config = z.infer<typeof text_Config_Schema>;

export const text_Props_Schema = createTextSchema('props');
export type ContentBlock_Text_Props = z.infer<typeof text_Props_Schema>;
