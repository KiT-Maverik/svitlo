import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretSensorError_Skill_Data = buildSkillConfig({
  slug: 'interpretSensorError',
  id: 'd9c78d44-c402-4f7c-bca4-ee2cd339efbd',
  name: {
    en: 'Interpret sensor error',
  },
  description: {
    methodological: 'Distinguish real changes from drift, limited resolution and random noise.',
    frontend: {
      en: 'Recognize how sensor error can affect a control decision.',
    },
  },
});
