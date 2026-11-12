import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';

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

/** Override fields come directly from the authored schema; identity is excluded. */
export type Skill_Overrides = DeepPartial<Pick<Skill_Config, 'name' | 'description'>>;
export const skill_Override_Config_Schema: z.ZodType<Skill_Overrides> = z.deepPartial(
  deepStrict_Schema(skill_Config_Schema.omit({ id: true, slug: true })),
);

