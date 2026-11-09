import type { DeepPartial } from '#types';

import { skillGroup_Config_Schema, type SkillGroup_Config } from './defineSkillGroup.schemas';

export function defineSkillGroup(config: SkillGroup_Config) {
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
        ({ name, description: { frontend: description.frontend } }) satisfies DeepPartial<SkillGroup_Config>,
    },
    skill: Object.fromEntries(skills.map((skill): [string, typeof skill] => [skill.config.base.slug, skill])),
  };
}

export type SkillGroup_Configurator = ReturnType<typeof defineSkillGroup>;
