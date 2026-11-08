import {z} from "zod";

import {locale_All_Schema, localeText_Schema} from "#schemas";

const assessmentMethod_Base_Schema = z.strictObject({
  id: z.uuid(),
  slug: z.string().min(1),
});

export const assessmentMethod_Config_Schema = z.strictObject({
  description: locale_All_Schema,
  title: locale_All_Schema,
}).and(assessmentMethod_Base_Schema);

export type AssessmentMethod_Config = z.infer<typeof assessmentMethod_Config_Schema>;

export const assessmentMethod_Props_Schema = z.strictObject({
  description: localeText_Schema,
  title: localeText_Schema,
}).and(assessmentMethod_Base_Schema);

export type AssessmentMethod_Props = z.infer<typeof assessmentMethod_Props_Schema>;
