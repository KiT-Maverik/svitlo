import { z } from 'zod';

import { locale_All_Schema, localeText_Schema } from '#schemas';

const skill_Base_Schema = z.strictObject({
  id: z.uuid(),
  slug: z.string().min(1),
});

const description_Base_Schema = z.strictObject({ methodological: localeText_Schema });

export const skill_Config_Schema = z.strictObject({
  ...skill_Base_Schema.shape,
  description: z.strictObject({
    ...description_Base_Schema.shape,
    frontend: locale_All_Schema,
  }),
  name: locale_All_Schema,
});

export type Skill_Config = z.infer<typeof skill_Config_Schema>;

export const skill_Props_Schema = z.strictObject({
  ...skill_Base_Schema.shape,
  description: z.strictObject({
    ...description_Base_Schema.shape,
    frontend: localeText_Schema,
  }),
  name: localeText_Schema,
});

export type Skill_Props = z.infer<typeof skill_Props_Schema>;
