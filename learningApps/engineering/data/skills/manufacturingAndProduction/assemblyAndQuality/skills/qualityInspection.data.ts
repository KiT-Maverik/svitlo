import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const qualityInspection_Skill_Data = buildSkillConfig({
  slug: 'qualityInspection',
  id: 'd29ff2a0-e58a-4769-a4a4-5617015ef9b3',
  name: {
    en: 'Quality inspection',
  },
  description: {
    methodological: 'Compare specified product attributes with actual measurements instead of relying on appearance.',
    frontend: {
      en: 'Check a produced part against measurable quality requirements.',
    },
  },
});
