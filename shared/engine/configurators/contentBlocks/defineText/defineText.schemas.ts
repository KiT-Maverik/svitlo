import { z } from 'zod';

import {
  createContentBlockMetaSchema,
  contentBlockLocalizationSwitch,
  textStylingRules_Schema,
} from '../contentBlock.schemas';

const wrap_Schema = z
  .strictObject({
    enabled: z.literal(true).optional(),
    typographyProps: z.unknown().optional(),
  })
  .optional();

function createTextSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];

  return z.object({
    ...createContentBlockMetaSchema('text').shape,
    params: z.object({
      ...textStylingRules_Schema.shape,
      wrap: wrap_Schema,
      ...(mode === 'props' ? { disabled: z.literal(true).optional() } : {}),
    }),
    value: localized,
  });
}

export const text_Config_Schema = createTextSchema('config');
export type ContentBlock_Text_Config = z.infer<typeof text_Config_Schema>;

export const text_Props_Schema = createTextSchema('props');
export type ContentBlock_Text_Props = z.infer<typeof text_Props_Schema>;
