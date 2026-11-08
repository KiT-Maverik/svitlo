import { z } from 'zod';

import {
  createLocaleSubsetSchema,
  localeText_Schema,
  nonTranslatableText_Schema,
  type LanguageCodes,
} from '#schemas';

import { createContentBlockMetaSchema, textStylingRules_Schema } from '../contentBlock.schemas';

export type TextLanguages = readonly [LanguageCodes, ...LanguageCodes[]];

const params_Schema = z.strictObject({
  ...textStylingRules_Schema.shape,
  wrap: z
    .strictObject({
      enabled: z.literal(true).optional(),
      /** MUI TypographyProps, checked by the authoring app before serialization. */
      typographyProps: z.unknown().optional(),
    })
    .optional(),
});

const base = createContentBlockMetaSchema('text').shape;

export const createTextConfigSchema = <const SupportedLanguages extends TextLanguages>(languages: SupportedLanguages) =>
  z.strictObject({
    ...base,
    params: params_Schema,
    value: z.union([nonTranslatableText_Schema, createLocaleSubsetSchema(languages, true)]),
  });

export type ContentBlock_Text_Config<SupportedLanguages extends TextLanguages> = z.input<
  ReturnType<typeof createTextConfigSchema<SupportedLanguages>>
>;

export const textProps_Schema = z.strictObject({
  ...base,
  params: z.strictObject({ ...params_Schema.shape, disabled: z.literal(true).optional() }),
  value: localeText_Schema,
});

export type ContextBlock_Text_Props = z.output<typeof textProps_Schema>;
