import type { DeepPartial } from '#types';
import { configuratorArrayToSlugMap } from '../../configuratorArrayToSlugMap';
import type { Skill_Configurator } from '../defineSkill';

import { skillGroup_Config_Schema, type SkillGroup_Config } from './defineSkillGroup.schemas';

const validate = (config: unknown) => {
  skillGroup_Config_Schema.parse(config);
};

export function defineSkillGroup<const Slug extends string, const Skills extends readonly Skill_Configurator[]>(
  config: Omit<SkillGroup_Config, 'slug' | 'skills'> & { slug: Slug; skills: Skills },
) {
  validate(config);

  const { id, description, slug, name, skills } = config;

  const base = {
    id,
    slug,
    description: { methodological: description.methodological },
  } satisfies DeepPartial<SkillGroup_Config>;

  return {
    id,
    slug,
    type: 'skillGroup' as const,
    config: {
      base,
      validate,
      locales: () =>
        ({
          name,
          ...(description.frontend === undefined ? {} : { description: { frontend: description.frontend } }),
        }) satisfies DeepPartial<SkillGroup_Config>,
    },
    skill: configuratorArrayToSlugMap(skills),
  };
}

export type SkillGroup_Configurator = ReturnType<typeof defineSkillGroup>;
