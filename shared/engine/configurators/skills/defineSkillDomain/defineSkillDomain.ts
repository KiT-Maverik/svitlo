import type { DeepPartial } from '#types';

import { skillDomain_Config_Schema, type SkillDomain_Config } from './defineSkillDomain.schemas';

export function defineSkillDomainMethod(config: SkillDomain_Config) {
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
        ({ title, description: { frontend: description.frontend } }) satisfies DeepPartial<SkillDomain_Config>,
    },
    group: Object.fromEntries((groups ?? []).map((group): [string, typeof group] => [group.config.base.slug, group])),
    skill: Object.fromEntries((skills ?? []).map((skill): [string, typeof skill] => [skill.config.base.slug, skill])),
  };
}

export type SkillDomain_Configurator = ReturnType<typeof defineSkillDomainMethod>;
