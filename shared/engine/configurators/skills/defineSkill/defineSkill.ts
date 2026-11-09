import type { DeepPartial } from '#types';

import { skill_Config_Schema, type Skill_Config } from './defineSkill.schemas';

export function defineSkill(config: Skill_Config) {
  skill_Config_Schema.parse(config);

  const { id, description, slug, name } = config;

  const base = {
    id,
    slug,
    description: { methodological: description.methodological },
  } satisfies DeepPartial<Skill_Config>;

  return {
    config: {
      base,
      locales: () => ({ name, description: { frontend: description.frontend } }) satisfies DeepPartial<Skill_Config>,
    },
  };
}

export type Skill_Configurator = ReturnType<typeof defineSkill>;
