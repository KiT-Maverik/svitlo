import { z } from 'zod';

import { languageCode_Schema, localeText_Schema, nonTranslatableText_Schema, camelCase_Schema } from '#schemas';
import { paramsBase_Schema } from '../../_shared';

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

export const createContentBlockBaseSchema = <const Type extends ContentBlock_Type>(type: Type) =>
  z.object({
    id: z.uuid(),
    slug: camelCase_Schema.min(1),
    type: z.literal(type),
    ...paramsBase_Schema.shape,
  });

const localeSubset_Schema = z
  .partialRecord(languageCode_Schema, localeText_Schema)
  .refine(value => Object.keys(value).length > 0, 'At least one localized value is required');

export const localizationSwitch = {
  config: z.union([nonTranslatableText_Schema, localeSubset_Schema]),
  props: localeText_Schema,
} as const;
