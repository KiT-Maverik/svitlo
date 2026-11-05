import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const respondToHeatIllness_Skill_Data = buildSkillConfig({
  slug: 'respondToHeatIllness',
  id: 'e31324c2-766c-4a2f-8b6c-8e2a7b41368d',
  name: {
    en: 'Respond to heat illness',
  },
  description: {
    methodological:
      'Distinguish concerning heat-related symptoms and prioritize safe cooling and escalation for severe illness.',
    frontend: {
      en: 'Recognize serious heat illness and the need for cooling and urgent care.',
    },
  },
});
