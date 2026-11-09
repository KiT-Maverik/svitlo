import type { SkillId } from '@svitlo/contracts/content';
import type { DeepPartial } from '#types';

import { skill_Config_Schema, type Skill_Config } from './defineSkill.schemas';

export function defineSkill<const Slug extends string>(config: Skill_Config & { slug: Slug }) {
  skill_Config_Schema.parse(config);

  const { id, description, slug, name } = config;

  const base = {
    // The UUID has already passed Zod's uuid() validation above.
    id: id as SkillId,
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
