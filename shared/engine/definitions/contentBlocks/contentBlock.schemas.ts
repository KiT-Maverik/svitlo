import { z } from 'zod';

import type {ContentBlock_Type} from './contentBlocks.types';

export const contentBlockTypes = ['text', 'code', 'image', 'video', 'youtube', 'carousel'] as const;
export type ContentBlock_Type = typeof contentBlockTypes[number];

const createContentBlockMetaSchema = (type: ContentBlock_Type) => z.object({
  id: z.uuid(),
  slug: z.string().min(1),
  type: z.literal(type),
});

export const textStylePresets = ['highlight', 'bold', 'cursive', 'underscore', 'crossed', 'variable'] as const;
export type TextStylePreset = typeof textStylePresets[number];

export const textTonePresets = ['neutral', 'info', 'warning', 'success'] as const;
export type TextTonePreset = typeof textTonePresets[number];

const textStylingRule_Schema = z.strictObject({
  id: z.uuid(),
  applyStyle: z.array(z.enum(textStylePresets)).min(1),
  applyColor: z.string().optional(),
  tone: z.enum(textTonePresets).optional(),
});

export const textStylingRules_Schema = z.object({
  styling: z.array(textStylingRule_Schema).min(1).optional(),
})
