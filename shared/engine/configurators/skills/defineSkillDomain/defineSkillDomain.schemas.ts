import {z} from "zod";

import { locale_All_Schema, localeText_Schema } from "#schemas";

const skillDomain_Base_Schema = z.strictObject({
  id: z.uuid(),
  slug: z.string().min(1),
});

export const skillDomain_Config_Schema = z.strictObject({
  description: locale_All_Schema,
  title: locale_All_Schema,
}).and(skillDomain_Base_Schema);

export type SkillDomain_Config = z.infer<typeof skillDomain_Config_Schema>;

export const skillDomain_Props_Schema = z.strictObject({
  description: localeText_Schema,
  title: localeText_Schema,
}).and(skillDomain_Base_Schema);

export type SkillDomain_Props = z.infer<typeof skillDomain_Props_Schema>;
