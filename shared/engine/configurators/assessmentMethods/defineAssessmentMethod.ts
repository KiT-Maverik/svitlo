import type { DeepPartial } from '#types';

import { assessmentMethod_Config_Schema, type AssessmentMethod_Config } from './defineAssessmentMethod.schemas';

export function defineAssessmentMethod(config: AssessmentMethod_Config) {
  assessmentMethod_Config_Schema.parse(config);

  const { id, description, slug, title } = config;

  const base = {
    id,
    slug,
  } satisfies DeepPartial<AssessmentMethod_Config>;

  return {
    config: {
      base,
      locales: () => ({ title, description }) satisfies DeepPartial<AssessmentMethod_Config>,
    },
  };
}

export type AssessmentMethod_Configurator = ReturnType<typeof defineAssessmentMethod>;
