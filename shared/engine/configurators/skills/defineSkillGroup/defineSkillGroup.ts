import { skillGroup_Config_Schema, skillGroup_Props_Schema, type SkillGroup_Config } from './defineSkillGroup.schemas';

export function defineSkillGroupMethod(config: SkillGroup_Config) {
  const { id, description, slug, name, skills } = config;

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
        config: () => skillGroup_Config_Schema.safeParse(config).success,
        props: (props: unknown) => skillGroup_Props_Schema.safeParse(props).success,
      },
    },
    skill: Object.fromEntries(skills.map((skill): [string, typeof skill] => [skill.config.base.slug, skill])),
  };
}

export type SkillGroup_Configurator = ReturnType<typeof defineSkillGroupMethod>;
