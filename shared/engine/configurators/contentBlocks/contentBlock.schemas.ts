import { z } from 'zod';

import { languageCode_Schema, localeText_Schema, nonTranslatableText_Schema } from '#schemas';

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
  z.object({ id: z.uuid(), slug: z.string().min(1), type: z.literal(type) });

export type ContentBlock_Meta<Type extends ContentBlock_Type> = z.infer<
  ReturnType<typeof createContentBlockMetaSchema<Type>>
>;

/** Lessons can publish a subset of languages; unlike Skills, their locale maps are sparse. */
const localeSubset_Schema = z
  .partialRecord(languageCode_Schema, localeText_Schema)
  .refine(value => Object.keys(value).length > 0, 'At least one localized value is required');

export const contentBlockLocalizationSwitch = {
  config: z.union([nonTranslatableText_Schema, localeSubset_Schema]),
  props: localeText_Schema,
} as const;

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
