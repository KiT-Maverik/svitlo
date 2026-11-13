import { z } from 'zod';

import { languageCode_Schema, localeText_Schema, nonTranslatableText_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../_shared__configurators';
import { contentBlockTypes, type ContentBlock_Type } from './contentBlock.constants';

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

/** Nest configurators, not authored child configs. */
export const contentBlockConfigurator_Schema = z.custom<{
  readonly config: {
    readonly base: { readonly id: string; readonly slug: string; readonly type: ContentBlock_Type };
    readonly locales: () => unknown;
  };
}>(
  value => {
    if (value === null || typeof value !== 'object' || !('config' in value)) return false;
    const config = value.config;
    if (config === null || typeof config !== 'object' || !('base' in config) || !('locales' in config)) return false;
    const base = config.base;
    return (
      typeof config.locales === 'function' &&
      base !== null &&
      typeof base === 'object' &&
      'id' in base &&
      typeof base.id === 'string' &&
      'slug' in base &&
      typeof base.slug === 'string' &&
      'type' in base &&
      contentBlockTypes.includes(base.type as ContentBlock_Type)
    );
  },
  { message: 'Expected a ContentBlock configurator returned by define*, not a raw config' },
);
