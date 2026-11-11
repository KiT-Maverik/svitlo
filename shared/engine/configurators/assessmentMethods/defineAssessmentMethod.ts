import type { DeepPartial } from '#types';

import { assessmentMethod_Config_Schema, type AssessmentMethod_Config } from './defineAssessmentMethod.schemas';

const validate = (config: AssessmentMethod_Config) => {
  assessmentMethod_Config_Schema.parse(config);
};

export function defineAssessmentMethod(config: AssessmentMethod_Config) {
  validate(config);

  const { id, description, slug, title } = config;

  const base = {
    id,
    slug,
  } satisfies DeepPartial<AssessmentMethod_Config>;

  return {
    id,
    slug,
    type: 'assessmentMethod' as const,
    config: {
      base,
      validate,
      locales: () => ({ title, description }) satisfies DeepPartial<AssessmentMethod_Config>,
    },
  };
}

export type AssessmentMethod_Configurator = ReturnType<typeof defineAssessmentMethod>;
