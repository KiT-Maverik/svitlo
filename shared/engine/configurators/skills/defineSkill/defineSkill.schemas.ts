import { z } from 'zod';

import { localizationSwitch, localeText_Schema } from '#schemas';

function createSkillSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
  const localized = localizationSwitch[mode];

  return z.object({
    id: z.uuid(),
    slug: z.string().min(1),
    description: z.object({
      methodological: localeText_Schema,
      frontend: localized,
    }),
    name: localized,
  });
}

export const skill_Config_Schema = createSkillSchema('config');
export type Skill_Config = z.infer<typeof skill_Config_Schema>;

export const skill_Props_Schema = createSkillSchema('props');
export type Skill_Props = z.infer<typeof skill_Props_Schema>;
