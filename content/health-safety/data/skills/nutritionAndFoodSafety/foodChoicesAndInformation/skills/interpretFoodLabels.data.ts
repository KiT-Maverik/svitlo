import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretFoodLabels_Skill_Data = buildSkillConfig({
  slug: 'interpretFoodLabels',
  id: 'fc2251e9-a092-41a0-ac0f-d7696026cbba',
  name: {
    en: 'Interpret food labels',
  },
  description: {
    methodological:
      'Use ingredient lists, nutritional information, serving quantities, and date markings without treating a marketing slogan as evidence.',
    frontend: {
      en: 'Read food ingredients, serving sizes and nutritional information.',
    },
  },
});
