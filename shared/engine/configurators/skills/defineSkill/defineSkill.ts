import {
  skill_Config_Schema,
  skill_Props_Schema,
  type Skill_Config,
} from './defineSkill.schemas';

export function defineSkill(config: Skill_Config) {
  const { id, description, slug, name } = config;

  const base = {
    id,
    slug,
    description: { methodological: description.methodological },
  };

  return {
    config: {
      base,
      locales: () => ({ name, description: { frontend: description.frontend } }),
      test: {
        config: () => skill_Config_Schema.safeParse(config).success,
        props: (props: unknown) => skill_Props_Schema.safeParse(props).success,
      },
    },
  };
}

export type Skill_Configurator = ReturnType<typeof defineSkill>;
