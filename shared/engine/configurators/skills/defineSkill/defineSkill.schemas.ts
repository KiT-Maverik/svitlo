import {z} from "zod";

import { locale_All_Schema, localeText_Schema } from "#schemas";

const skill_Base_Schema = z.strictObject({
  id: z.uuid(),
  slug: z.string().min(1),
  description: {
    methodological: localeText_Schema,
  }
});

export const skill_Config_Schema = z.strictObject({
  description: {
    frontend: locale_All_Schema,
  },
  name: locale_All_Schema,
}).and(skill_Base_Schema);

export type Skill_Config = z.infer<typeof skill_Config_Schema>;

export const skill_Props_Schema = z.strictObject({
  description: {
    frontend: localeText_Schema,
  },
  name: localeText_Schema,
}).and(skill_Base_Schema);

export type Skill_Props = z.infer<typeof skill_Props_Schema>;
