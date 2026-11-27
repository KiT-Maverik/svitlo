import { z } from 'zod';

import { localeText_Schema } from '#schemas';

import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Skill_Configurator } from '../defineSkill/defineSkill';
import { skill_Data_Schema, type Skill_Data } from '../defineSkill/defineSkill.schemas';

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
  name: localizationSwitch[mode],
});

/** Child configurators are bound by their own identity, language scope and Build API. */
export const skillGroup_Config_Schema = z.object(localized('config')).extend({
  skills: z.record(z.string(), z.custom<Skill_Configurator>()),
});
export type SkillGroup_Config = z.infer<typeof skillGroup_Config_Schema>;
export type SkillGroup_Metadata = Pick<SkillGroup_Config, 'name' | 'description'>;

export const skillGroup_Data_Schema = z.object(localized('data')).extend({
  skills: z.array(skill_Data_Schema),
});
export type SkillGroup_Data = z.infer<typeof skillGroup_Data_Schema>;
export type SkillGroup_Child_Data = Skill_Data;
