import { z } from 'zod';

import { createContentBlockMetaSchema, contentBlockLocalizationSwitch } from '../contentBlock.schemas';

function createCodeSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];

  return z
    .object({
      ...createContentBlockMetaSchema('code').shape,
      language: z.string().min(1),
      title: localized.optional(),
      code: localized.optional(),
      fileLocation: localized.optional(),
      variables: z.array(z.object({ id: z.string().min(1), value: localized })).optional(),
    })
    .refine(value => Number(value.code !== undefined) + Number(value.fileLocation !== undefined) === 1, {
      message: 'Provide exactly one of code or fileLocation',
    });
}

export const code_Config_Schema = createCodeSchema('config');
export type ContentBlock_Code_Config = z.infer<typeof code_Config_Schema>;

export const code_Props_Schema = createCodeSchema('props');
export type ContentBlock_Code_Props = z.infer<typeof code_Props_Schema>;
