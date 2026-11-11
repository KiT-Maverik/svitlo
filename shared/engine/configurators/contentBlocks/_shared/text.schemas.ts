import { z } from 'zod';

export const textStylePresets = ['highlight', 'bold', 'cursive', 'underscore', 'crossed', 'variable'] as const;
export type TextStylePreset = (typeof textStylePresets)[number];

export const textTonePresets = ['neutral', 'info', 'warning', 'success'] as const;
export type TextTonePreset = (typeof textTonePresets)[number];

const textStyle_Schema = z.enum(textStylePresets);

const textVariableRule_Schema = z.strictObject({
  applyStyle: z.tuple([textStyle_Schema], textStyle_Schema),
  applyColor: z.string().optional(),
  tone: z.enum(textTonePresets).optional(),
});

export const textVariables_Schema = z.object({
  variables: z.record(z.string().regex(/^[a-z][A-Za-z0-9]*$/), textVariableRule_Schema).optional(),
});
