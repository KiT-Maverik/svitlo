import type { DeepPartial } from '#types';
import { configuratorArrayToSluggedObject } from '../../../utils/configuratorArrayToSluggedObject/configuratorArrayToSluggedObject.utils';

import { skillDomain_Config_Schema, type SkillDomain_Config } from './defineSkillDomain.schemas';

export function defineSkillDomain(config: SkillDomain_Config) {
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
    group: configuratorArrayToSluggedObject(groups ?? []),
    skill: configuratorArrayToSluggedObject(skills ?? []),
  };
}

export type SkillDomain_Configurator = ReturnType<typeof defineSkillDomain>;
