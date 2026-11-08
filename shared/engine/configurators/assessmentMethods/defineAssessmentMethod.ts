import {
  assessmentMethod_Config_Schema,
  assessmentMethod_Props_Schema,
  type AssessmentMethod_Config,
} from './defineAssessmentMethod.schemas';

export function defineAssessmentMethod(config: AssessmentMethod_Config) {
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
        config: () => assessmentMethod_Config_Schema.safeParse(config).success,
        props: (props: unknown) => assessmentMethod_Props_Schema.safeParse(props).success,
      },
    },
  };
}

export type AssessmentMethod_Configurator = ReturnType<typeof defineAssessmentMethod>;
