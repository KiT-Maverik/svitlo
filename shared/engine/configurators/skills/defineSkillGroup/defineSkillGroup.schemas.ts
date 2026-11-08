import { z } from 'zod';

import { localizationSwitch, localeText_Schema } from '#schemas';

function createSkillGroupSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
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

export const skillGroup_Config_Schema = createSkillGroupSchema('config');
export type SkillGroup_Config = z.infer<typeof skillGroup_Config_Schema>;

export const skillGroup_Props_Schema = createSkillGroupSchema('props');
export type SkillGroup_Props = z.infer<typeof skillGroup_Props_Schema>;
