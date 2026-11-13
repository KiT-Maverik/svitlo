import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema, localeText_Schema } from '#schemas';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';

import { skill_Props_Schema, type Skill_Props } from '../defineSkill/defineSkill.schemas';
import type { Skill_Configurator } from '../defineSkill/defineSkill';

const localized = (mode: 'config' | 'props') => ({
  id: z.uuid(),
  slug: z.string().min(1),
  description: z.object({
    methodological: localeText_Schema,
    frontend: localizationSwitch[mode].optional(),
  }),
  name: localizationSwitch[mode],
});

/** Child instances are not raw Zod objects. The parent validates their boundary. */
export const skillGroup_Config_Schema = z.object(localized('config')).extend({
  skills: z.object({
    items: z.record(z.string(), z.custom<Skill_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type SkillGroup_Config = z.infer<typeof skillGroup_Config_Schema>;

export type SkillGroup_Metadata_Overrides = DeepPartial<Pick<SkillGroup_Config, 'description' | 'name'>>;
export const skillGroup_Override_Config_Schema: z.ZodType<SkillGroup_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(skillGroup_Config_Schema.omit({ id: true, slug: true, skills: true })),
);

export type SkillGroup_Overrides<
  Items extends Record<string, Skill_Configurator> = Record<string, Skill_Configurator>,
  Added extends Record<string, Skill_Configurator> = {},
> = SkillGroup_Metadata_Overrides & {
  skills?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};

export const skillGroup_Props_Schema = z.object(localized('props')).extend({
  skills: z.array(skill_Props_Schema),
});
export type SkillGroup_Props = z.infer<typeof skillGroup_Props_Schema>;
export type SkillGroup_Child_Props = Skill_Props;
