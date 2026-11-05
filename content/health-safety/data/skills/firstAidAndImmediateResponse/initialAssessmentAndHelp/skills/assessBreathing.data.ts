import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessBreathing_Skill_Data = buildSkillConfig({
  slug: 'assessBreathing',
  id: 'c70f51c3-a235-42f2-bfe7-0a6b3cba726f',
  name: {
    en: 'Assess breathing',
  },
  description: {
    methodological: 'Recognize absent or abnormal breathing as a medical emergency without delaying the call for help.',
    frontend: {
      en: 'Recognize abnormal or absent breathing that needs emergency action.',
    },
  },
});
