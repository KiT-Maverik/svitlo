import { z } from 'zod';

import { localeText_Schema } from '#schemas';

import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Skill_Configurator } from '../defineSkill/defineSkill';
import { skill_Props_Schema, type Skill_Props } from '../defineSkill/defineSkill.schemas';
import type { SkillGroup_Configurator } from '../defineSkillGroup/defineSkillGroup';
import { skillGroup_Props_Schema, type SkillGroup_Props } from '../defineSkillGroup/defineSkillGroup.schemas';

const frontendByMode = {
  config: localizationSwitch.config.optional(),
  props: localizationSwitch.props.optional(),
} as const;

const localized = <const Mode extends 'config' | 'props'>(mode: Mode) => ({
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

export const skillDomain_Props_Schema = z.object(localized('props')).extend({
  skills: z.array(skill_Props_Schema).optional(),
  groups: z.array(skillGroup_Props_Schema).optional(),
});
export type SkillDomain_Props = z.infer<typeof skillDomain_Props_Schema>;
export type SkillDomain_Child_Props = Skill_Props | SkillGroup_Props;
