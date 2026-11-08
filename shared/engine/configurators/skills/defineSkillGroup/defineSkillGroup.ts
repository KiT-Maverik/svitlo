import {
  skillGroup_Config_Schema,
  skillGroup_Props_Schema,
  type SkillGroup_Config,
} from './defineSkillGroup.schemas';

export function defineSkillGroupMethod(config: SkillGroup_Config) {
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
        config: () => skillGroup_Config_Schema.safeParse(config).success,
        props: (props: unknown) => skillGroup_Props_Schema.safeParse(props).success,
      },
    },
  };
}

export type SkillGroup_Configurator = ReturnType<typeof defineSkillGroupMethod>;
