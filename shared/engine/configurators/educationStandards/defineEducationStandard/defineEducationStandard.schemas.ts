import { z } from 'zod';

import {
  camelCase_Schema,
  locale_All_Schema,
  localeText_Schema,
  nonTranslatableText_Schema,
} from '#schemas';

/** Preserve the author's original text and reject whitespace-only values. */
const requiredText_Schema = nonTranslatableText_Schema.refine(value => value.trim().length > 0, 'Text must not be blank');

const allFrontendLocales_Schema = locale_All_Schema.superRefine((values, context) => {
  for (const [language, value] of Object.entries(values)) {
    if (!value.trim()) {
      context.addIssue({ code: 'custom', path: [language], message: 'Frontend description must not be blank' });
    }
  }
});

const createRangeSchema = (maximum: number) =>
  z.strictObject({
    min: z.int().min(0).max(maximum),
    max: z.int().min(0).max(maximum),
  }).refine(range => range.min <= range.max, 'Minimum must not exceed maximum');

const countries_Schema = z.array(z.string().regex(/^[A-Z]{2}$/, 'Expected uppercase ISO 3166-1 alpha-2 code'))
  .min(1)
  .refine(countries => new Set(countries).size === countries.length, 'Country codes must be unique');

/** Optional jurisdictional metadata; neither a certification nor a compliance claim. */
const educationStandardParams_Schema = z.strictObject({
  countries: countries_Schema.optional(),
  age: createRangeSchema(125).optional(),
  grade: createRangeSchema(40).optional(),
  version: requiredText_Schema.optional(),
  sourceUrl: z.url().refine(url => /^https?:\/\//.test(url), 'Expected an HTTP(S) source URL').optional(),
  nameLanguage: z.string()
    .regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, 'Expected a BCP 47 language tag')
    .optional(),
});

const common = {
  id: z.uuid(),
  slug: camelCase_Schema,
  name: requiredText_Schema,
  params: educationStandardParams_Schema.optional(),
};

export const educationStandard_Config_Schema = z.strictObject({
  ...common,
  description: z.strictObject({
    methodological: requiredText_Schema,
    frontend: allFrontendLocales_Schema,
  }),
});
export type EducationStandard_Config = z.infer<typeof educationStandard_Config_Schema>;

/** One resolved publication language, never an all-language dictionary. */
export const educationStandard_Props_Schema = z.strictObject({
  ...common,
  description: z.strictObject({
    methodological: requiredText_Schema,
    frontend: localeText_Schema.refine(value => value.trim().length > 0, 'Text must not be blank'),
  }),
});
export type EducationStandard_Props = z.infer<typeof educationStandard_Props_Schema>;
