import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeChangesInHealthStatus_Skill_Data = buildSkillConfig({
  slug: 'recognizeChangesInHealthStatus',
  id: 'b296e972-4462-4fc4-882c-f988f47add03',
  name: {
    en: 'Recognize changes in health status',
  },
  description: {
    methodological:
      'Distinguish a usual bodily variation from a new or worsening change that deserves monitoring or advice, without treating a single symptom as a definitive diagnosis.',
    frontend: {
      en: 'Recognize when a new bodily change deserves attention or professional advice.',
    },
  },
});
