import {
  skillDomain_Config_Schema,
  skillDomain_Props_Schema,
  type SkillDomain_Config,
} from './defineSkillDomain.schemas';

export function defineSkillDomainMethod(config: SkillDomain_Config) {
  const { id, description, slug, title, skills, groups } = config;

  const base = {
    id,
    slug,
  };

  return {
    config: {
      base,
      locales: () => ({ title, description }),
      test: {
        config: () => skillDomain_Config_Schema.safeParse(config).success,
        props: (props: unknown) => skillDomain_Props_Schema.safeParse(props).success,
      },
    },
    skill: Object.fromEntries((skills ?? []).map((skill): [string, typeof skill] => [skill.config.base.slug, skill])),
    group: Object.fromEntries((groups ?? []).map((group): [string, typeof group] => [group.config.base.slug, group])),
  };
}

export type SkillDomain_Configurator = ReturnType<typeof defineSkillDomainMethod>;
