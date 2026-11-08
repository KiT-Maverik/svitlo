import { z } from 'zod';

export const contentBlockTypes = [
  'text',
  'code',
  'image',
  'video',
  'youtube',
  'carousel',
  'scene',
  'checkpoint',
  'markdown',
  'audio',
] as const;
export type ContentBlock_Type = (typeof contentBlockTypes)[number];

export const createContentBlockMetaSchema = <const Type extends ContentBlock_Type>(type: Type) =>
  z.object({
    id: z.uuid(),
    slug: z.string().min(1),
    type: z.literal(type),
  });

export type ContentBlock_Meta<Type extends ContentBlock_Type> = z.infer<
  ReturnType<typeof createContentBlockMetaSchema<Type>>
>;

export const textStylePresets = ['highlight', 'bold', 'cursive', 'underscore', 'crossed', 'variable'] as const;
export type TextStylePreset = (typeof textStylePresets)[number];

export const textTonePresets = ['neutral', 'info', 'warning', 'success'] as const;
export type TextTonePreset = (typeof textTonePresets)[number];

const textStyle_Schema = z.enum(textStylePresets);

const textStylingRule_Schema = z.strictObject({
  id: z.uuid(),
  applyStyle: z.tuple([textStyle_Schema], textStyle_Schema),
  applyColor: z.string().optional(),
  tone: z.enum(textTonePresets).optional(),
});

export const textStylingRules_Schema = z.object({
  styling: z.tuple([textStylingRule_Schema], textStylingRule_Schema).optional(),
});
