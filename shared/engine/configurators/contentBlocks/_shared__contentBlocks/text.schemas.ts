import { z } from 'zod';
import { textStylePresets, textTonePresets } from '../contentBlock.constants';

const textStyle_Schema = z.enum(textStylePresets);

const textVariableRule_Schema = z.strictObject({
  applyStyle: z.tuple([textStyle_Schema], textStyle_Schema),
  applyColor: z.string().optional(),
  tone: z.enum(textTonePresets).optional(),
});

export const textVariables_Schema = z.object({
  variables: z.record(z.string().regex(/^[a-z][A-Za-z0-9]*$/), textVariableRule_Schema).optional(),
});
