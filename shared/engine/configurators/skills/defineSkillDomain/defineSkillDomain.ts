import {
  skillDomain_Config_Schema,
  skillDomain_Props_Schema,
  type SkillDomain_Config,
} from './defineSkillDomain.schemas';

export function defineSkillDomainMethod(config: SkillDomain_Config) {
  const { id, description, slug, title } = config;

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
  };
}

export type SkillDomain_Configurator = ReturnType<typeof defineSkillDomainMethod>;
