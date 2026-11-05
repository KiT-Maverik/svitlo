import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const validateUserNeeds_Skill_Data = buildSkillConfig({
  slug: 'validateUserNeeds',
  id: '78ba95a3-d087-44fe-b618-90d369514452',
  name: {
    en: 'Validate user needs',
  },
  description: {
    methodological:
      'Assess whether the finished or representative solution actually meets the real-world needs of intended users in appropriate conditions, even where formal design requirements have been met.',
    frontend: {
      en: 'Find out whether a finished solution actually serves its intended users.',
    },
  },
});
