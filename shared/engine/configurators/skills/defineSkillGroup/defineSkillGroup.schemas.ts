import { z } from 'zod';

import { locale_All_Schema, localeText_Schema } from '#schemas';

const skillGroup_Base_Schema = z.strictObject({
  id: z.uuid(),
  slug: z.string().min(1),
});

const description_Base_Schema = z.strictObject({ methodological: localeText_Schema });

export const skillGroup_Config_Schema = z.strictObject({
  ...skillGroup_Base_Schema.shape,
  description: z.strictObject({
    ...description_Base_Schema.shape,
    frontend: locale_All_Schema,
  }),
  name: locale_All_Schema,
});

export type SkillGroup_Config = z.infer<typeof skillGroup_Config_Schema>;

export const skillGroup_Props_Schema = z.strictObject({
  ...skillGroup_Base_Schema.shape,
  description: z.strictObject({
    ...description_Base_Schema.shape,
    frontend: localeText_Schema,
  }),
  name: localeText_Schema,
});

export type SkillGroup_Props = z.infer<typeof skillGroup_Props_Schema>;
