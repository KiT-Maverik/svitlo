import { z } from 'zod';

import { localeText_Schema } from '#schemas';

import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Skill_Configurator } from '../defineSkill/defineSkill';
import { skill_Data_Schema, type Skill_Data } from '../defineSkill/defineSkill.schemas';
import type { SkillGroup_Configurator } from '../defineSkillGroup/defineSkillGroup';
import { skillGroup_Data_Schema, type SkillGroup_Data } from '../defineSkillGroup/defineSkillGroup.schemas';

const frontendByMode = {
  config: localizationSwitch.config.optional(),
  data: localizationSwitch.data.optional(),
} as const;

const localized = <const Mode extends 'config' | 'data'>(mode: Mode) => ({
  id: z.uuid(),
  slug: z.string().min(1),
  description: z.object({
    methodological: localeText_Schema,
    frontend: frontendByMode[mode],
  }),
  title: localizationSwitch[mode],
});

export const skillDomain_Config_Schema = z.object(localized('config')).extend({
  skills: z.record(z.string(), z.custom<Skill_Configurator>()).optional(),
  groups: z.record(z.string(), z.custom<SkillGroup_Configurator>()).optional(),
});
export type SkillDomain_Config = z.infer<typeof skillDomain_Config_Schema>;
export type SkillDomain_Metadata = Pick<SkillDomain_Config, 'title' | 'description'>;

export const skillDomain_Data_Schema = z.object(localized('data')).extend({
  skills: z.array(skill_Data_Schema).optional(),
  groups: z.array(skillGroup_Data_Schema).optional(),
});
export type SkillDomain_Data = z.infer<typeof skillDomain_Data_Schema>;
export type SkillDomain_Child_Data = Skill_Data | SkillGroup_Data;
