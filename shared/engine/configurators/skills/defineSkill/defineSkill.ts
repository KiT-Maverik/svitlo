import {
  skill_Config_Schema,
  skill_Props_Schema,
  type Skill_Config,
} from './defineSkill.schemas';

export function defineSkill(config: Skill_Config) {
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
        config: () => skill_Config_Schema.safeParse(config).success,
        props: (props: unknown) => skill_Props_Schema.safeParse(props).success,
      },
    },
  };
}

export type Skill_Configurator = ReturnType<typeof defineSkill>;
