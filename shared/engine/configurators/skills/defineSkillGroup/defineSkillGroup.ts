import { skillGroup_Config_Schema, skillGroup_Props_Schema, type SkillGroup_Config } from './defineSkillGroup.schemas';

type Base = Pick<SkillGroup_Config, 'id' | 'slug'> & {
  description: Pick<SkillGroup_Config['description'], 'methodological'>;
};

type Locale = Pick<SkillGroup_Config, 'name'> & {
  description: Pick<SkillGroup_Config['description'], 'frontend'>;
};

export function defineSkillGroupMethod(config: SkillGroup_Config) {
  const { id, description, slug, name, skills } = config;

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
        config: () => skillGroup_Config_Schema.safeParse(config).success,
        props: (props: unknown) => skillGroup_Props_Schema.safeParse(props).success,
      },
    },
    skill: Object.fromEntries(skills.map((skill): [string, typeof skill] => [skill.config.base.slug, skill])),
  };
}

export type SkillGroup_Configurator = ReturnType<typeof defineSkillGroupMethod>;
