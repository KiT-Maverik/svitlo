import { z } from 'zod';

export const textStylePresets = ['highlight', 'bold', 'cursive', 'underscore', 'crossed', 'variable'] as const;
export type TextStylePreset = (typeof textStylePresets)[number];

export const textTonePresets = ['neutral', 'info', 'warning', 'success'] as const;
export type TextTonePreset = (typeof textTonePresets)[number];

const textStyle_Schema = z.enum(textStylePresets);

const textStylingRule_Schema = z.strictObject({
  id: z.string().regex(/^[a-z][A-Za-z0-9]*$/),
  applyStyle: z.tuple([textStyle_Schema], textStyle_Schema),
  applyColor: z.string().optional(),
  tone: z.enum(textTonePresets).optional(),
});

export const textStylingRules_Schema = z.object({
  styling: z.tuple([textStylingRule_Schema], textStylingRule_Schema).optional(),
});
