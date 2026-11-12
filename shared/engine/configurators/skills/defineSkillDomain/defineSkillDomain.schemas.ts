import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema, localeText_Schema } from '#schemas';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';

import { skill_Props_Schema, type Skill_Configurator, type Skill_Props } from '../defineSkill';
import { skillGroup_Props_Schema, type SkillGroup_Configurator, type SkillGroup_Props } from '../defineSkillGroup';

const localized = (mode: 'config' | 'props') => ({
  id: z.uuid(),
  slug: z.string().min(1),
  description: z.object({
    methodological: localeText_Schema,
    frontend: localizationSwitch[mode].optional(),
  }),
  title: localizationSwitch[mode],
});

const skillCollection = z.object({
  items: z.record(z.string(), z.custom<Skill_Configurator>()),
  order: z.array(z.string()),
});
const groupCollection = z.object({
  items: z.record(z.string(), z.custom<SkillGroup_Configurator>()),
  order: z.array(z.string()),
});

export const skillDomain_Config_Schema = z.object(localized('config')).extend({
  skills: skillCollection.optional(),
  groups: groupCollection.optional(),
});
export type SkillDomain_Config = z.infer<typeof skillDomain_Config_Schema>;

export type SkillDomain_Metadata_Overrides = DeepPartial<Pick<SkillDomain_Config, 'description' | 'title'>>;
export const skillDomain_Override_Config_Schema: z.ZodType<SkillDomain_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(skillDomain_Config_Schema.omit({ id: true, slug: true, skills: true, groups: true })),
);

export type SkillDomain_Overrides<
  Skills extends Record<string, Skill_Configurator> = Record<string, Skill_Configurator>,
  Groups extends Record<string, SkillGroup_Configurator> = Record<string, SkillGroup_Configurator>,
  AddedSkills extends Record<string, Skill_Configurator> = {},
  AddedGroups extends Record<string, SkillGroup_Configurator> = {},
> = SkillDomain_Metadata_Overrides & {
  skills?: {
    items?: { [Key in keyof Skills]?: Parameters<Skills[Key]['build']['overrides']>[0] | false };
    additionalItems?: AddedSkills & { [Key in keyof Skills]?: never };
    order?: Extract<keyof Skills | keyof NoInfer<AddedSkills>, string>[];
  };
  groups?: {
    items?: { [Key in keyof Groups]?: Parameters<Groups[Key]['build']['overrides']>[0] | false };
    additionalItems?: AddedGroups & { [Key in keyof Groups]?: never };
    order?: Extract<keyof Groups | keyof NoInfer<AddedGroups>, string>[];
  };
};

export const skillDomain_Props_Schema = z.object(localized('props')).extend({
  skills: z.array(skill_Props_Schema).optional(),
  groups: z.array(skillGroup_Props_Schema).optional(),
});
export type SkillDomain_Props = z.infer<typeof skillDomain_Props_Schema>;
export type SkillDomain_Child_Props = Skill_Props | SkillGroup_Props;
