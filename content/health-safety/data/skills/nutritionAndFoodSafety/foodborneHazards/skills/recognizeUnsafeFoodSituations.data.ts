import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeUnsafeFoodSituations_Skill_Data = buildSkillConfig({
  slug: 'recognizeUnsafeFoodSituations',
  id: 'f83eb01b-a07d-4187-99bd-33b4b1ff7af8',
  name: {
    en: 'Recognize unsafe food situations',
  },
  description: {
    methodological:
      'Identify spoilage, damaged packaging, unsafe water, and uncertain storage histories while understanding that some hazards are invisible.',
    frontend: {
      en: 'Spot food-safety concerns even when food looks normal.',
    },
  },
});
