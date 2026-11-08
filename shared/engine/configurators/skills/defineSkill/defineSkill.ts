import {
  skill_Config_Schema,
  skill_Props_Schema,
  type Skill_Config,
} from './defineSkill.schemas';

type Base = Pick<Skill_Config, 'id' | 'slug' | 'name'>;

type Locale = Partial<Pick<Skill_Config, 'name'>>

export function defineSkill(config: Skill_Config) {
  const { id, description, slug, name } = config;

  const base: Base = {
    id,
    slug,
    description: { methodological: description.methodological },
  };

  return {
    config: {
      base,
      locales: (): Locale => ({ name, description: { frontend: description.frontend } }),
      test: {
        config: () => skill_Config_Schema.safeParse(config).success,
        props: (props: unknown) => skill_Props_Schema.safeParse(props).success,
      },
    },
  };
}

export type Skill_Configurator = ReturnType<typeof defineSkill>;
