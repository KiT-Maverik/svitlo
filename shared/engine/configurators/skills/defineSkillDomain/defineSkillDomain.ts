import { skillDomain_Config_Schema, type SkillDomain_Config } from './defineSkillDomain.schemas';

type Base = Pick<SkillDomain_Config, 'id' | 'slug'> & {
  description: Pick<SkillDomain_Config['description'], 'methodological'>;
};

type Locale = Pick<SkillDomain_Config, 'title'> & {
  description: Pick<SkillDomain_Config['description'], 'frontend'>;
};

export function defineSkillDomainMethod(config: SkillDomain_Config) {
  skillDomain_Config_Schema.parse(config);

  const { id, description, slug, title, skills, groups } = config;

  const base: Base = {
    id,
    slug,
    description: { methodological: description.methodological },
  };

  return {
    config: {
      base,
      locales: (): Locale => ({ title, description: { frontend: description.frontend } }),
    },
    group: Object.fromEntries((groups ?? []).map((group): [string, typeof group] => [group.config.base.slug, group])),
    skill: Object.fromEntries((skills ?? []).map((skill): [string, typeof skill] => [skill.config.base.slug, skill])),
  };
}

export type SkillDomain_Configurator = ReturnType<typeof defineSkillDomainMethod>;
