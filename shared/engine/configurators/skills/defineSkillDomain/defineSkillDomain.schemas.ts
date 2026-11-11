import { z } from 'zod';

import { localeText_Schema, localizationSwitch } from '#schemas';

import type { Skill_Configurator, Skill_Props } from '../defineSkill';
import type { SkillGroup_Configurator, SkillGroup_Props } from '../defineSkillGroup';

function createSkillDomainSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
  const localized = localizationSwitch[mode];

  return z.object({
    id: z.uuid(),
    slug: z.string().min(1),
    description: z.object({
      methodological: localeText_Schema,
      frontend: localized.optional(),
    }),
    title: localized,
  });
}

export const skillDomain_Config_Schema = createSkillDomainSchema('config');
export type SkillDomain_Config = z.infer<typeof skillDomain_Config_Schema> & {
  skills?: Skill_Configurator[];
  groups?: SkillGroup_Configurator[];
};

export const skillDomain_Props_Schema = createSkillDomainSchema('props');
export type SkillDomain_Props = z.infer<typeof skillDomain_Props_Schema> & {
  skills?: Skill_Props[];
  groups?: SkillGroup_Props[];
};
