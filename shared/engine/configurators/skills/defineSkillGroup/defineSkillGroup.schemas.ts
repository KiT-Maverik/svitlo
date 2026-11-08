import {z} from "zod";

import { locale_All_Schema, localeText_Schema } from "#schemas";

const skillGroup_Base_Schema = z.strictObject({
  id: z.uuid(),
  slug: z.string().min(1),
});

export const skillGroup_Config_Schema = z.strictObject({
  description: locale_All_Schema,
  title: locale_All_Schema,
}).and(skillGroup_Base_Schema);

export type SkillGroup_Config = z.infer<typeof skillGroup_Config_Schema>;

export const skillGroup_Props_Schema = z.strictObject({
  description: localeText_Schema,
  title: localeText_Schema,
}).and(skillGroup_Base_Schema);

export type SkillGroup_Props = z.infer<typeof skillGroup_Props_Schema>;
