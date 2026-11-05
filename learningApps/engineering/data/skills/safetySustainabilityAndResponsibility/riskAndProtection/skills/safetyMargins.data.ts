import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const safetyMargins_Skill_Data = buildSkillConfig({
  slug: 'safetyMargins',
  id: 'ba2b96ce-3ea4-4ca8-8a36-e63bbba894bb',
  name: {
    en: 'Safety margins',
  },
  description: {
    methodological: 'Relate uncertainty in loading, materials and use conditions to extra design capacity.',
    frontend: {
      en: 'Understand why safety factors account for uncertainty and unexpected loads.',
    },
  },
});
