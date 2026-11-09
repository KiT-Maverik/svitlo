import type { DeepPartial } from '#types';
import { configuratorArrayToSluggedObject } from '../../_utils';
import type { Skill_Configurator } from '../defineSkill/defineSkill';

import { skillGroup_Config_Schema, type SkillGroup_Config } from './defineSkillGroup.schemas';

export function defineSkillGroup<const Slug extends string, const Skills extends readonly Skill_Configurator[]>(
  config: Omit<SkillGroup_Config, 'slug' | 'skills'> & { slug: Slug; skills: Skills },
) {
  skillGroup_Config_Schema.parse(config);

  const { id, description, slug, name, skills } = config;

  const base = {
    id,
    slug,
    description: { methodological: description.methodological },
  } satisfies DeepPartial<SkillGroup_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({ name, ...(description.frontend === undefined ? {} : { description: { frontend: description.frontend } }) }) satisfies DeepPartial<SkillGroup_Config>,
    },
    skill: configuratorArrayToSluggedObject(skills),
  };
}

export type SkillGroup_Configurator = ReturnType<typeof defineSkillGroup>;
