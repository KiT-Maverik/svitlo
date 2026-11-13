import { z } from 'zod';

import { languageCode_Schema, localeText_Schema, nonTranslatableText_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../_shared__configurators/common.schemas';
import { contentBlockTypes } from './contentBlock.constants';
import type { ContentBlock_Type } from './contentBlock.constants';

export const createContentBlockBaseSchema = <const Type extends ContentBlock_Type>(type: Type) =>
  identityBase_Schema.extend({
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

/** Resolved child blocks are plain props, never authoring-time configurators. */
export const contentBlockResolved_Schema = z
  .object({
    id: z.uuid(),
    slug: z.string().min(1),
    type: z.enum(contentBlockTypes),
  })
  .catchall(z.unknown());
