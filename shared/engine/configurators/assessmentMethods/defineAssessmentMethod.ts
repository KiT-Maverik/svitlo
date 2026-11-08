import {
  AssessmentMethod_Config,
  assessmentMethod_Config_Schema,
  assessmentMethod_Props_Schema
} from "./defineAssessmentMethod.schemas";

export function defineAssessmentMethod(config: AssessmentMethod_Config) {
  const { id, description, slug, title } = config;

  const base: Partial<AssessmentMethod_Config> = {
    id,
    slug,
  } as const;

  if (typeof title === 'string') base.title = title;
  if (typeof description === 'string') base.description = description;

  return {
    config: {
      base,
      locales: () => {
        const result = {};

        if (typeof title !== 'string') result.title = title;
        if (typeof description !== 'string') result.description = title;

        return result
      },
      test: {
        config: () => assessmentMethod_Config_Schema.safeParse(config).success,
        props: (props: unknown) => assessmentMethod_Props_Schema.safeParse(props).success,
      },
    },
  };
}

export type AssessmentMethod_Configurator = ReturnType<typeof defineAssessmentMethod>;
