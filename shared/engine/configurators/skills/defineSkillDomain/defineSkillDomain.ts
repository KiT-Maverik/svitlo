import type { DeepPartial } from '#types';
import { configuratorArrayToSluggedObject } from '../../_utils';
import type { Skill_Configurator } from '../defineSkill/defineSkill';
import type { SkillGroup_Configurator } from '../defineSkillGroup/defineSkillGroup';

import { skillDomain_Config_Schema, type SkillDomain_Config } from './defineSkillDomain.schemas';

export function defineSkillDomain<
  const Slug extends string,
  const Groups extends readonly SkillGroup_Configurator[] = readonly [],
  const Skills extends readonly Skill_Configurator[] = readonly [],
>(
  config: Omit<SkillDomain_Config, 'slug' | 'groups' | 'skills'> & {
    slug: Slug;
    groups?: Groups;
    skills?: Skills;
  },
) {
  skillDomain_Config_Schema.parse(config);

  const { id, description, slug, title, skills, groups } = config;

  const base = {
    id,
    slug,
    description: { methodological: description.methodological },
  } satisfies DeepPartial<SkillDomain_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          title,
          ...(description.frontend === undefined ? {} : { description: { frontend: description.frontend } }),
        }) satisfies DeepPartial<SkillDomain_Config>,
    },
    group: configuratorArrayToSluggedObject(groups ?? []),
    skill: configuratorArrayToSluggedObject(skills ?? []),
  };
}

export type SkillDomain_Configurator = ReturnType<typeof defineSkillDomain>;
