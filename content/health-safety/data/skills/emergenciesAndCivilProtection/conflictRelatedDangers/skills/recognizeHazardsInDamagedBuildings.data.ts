import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeHazardsInDamagedBuildings_Skill_Data = buildSkillConfig({
  slug: 'recognizeHazardsInDamagedBuildings',
  id: '592ac848-6c5f-499f-b80f-100338b4ad83',
  name: {
    en: 'Recognize hazards in damaged buildings',
  },
  description: {
    methodological:
      'Avoid compromised structures, debris, unstable utilities, and unauthorized entry until qualified personnel assess the site.',
    frontend: {
      en: 'Avoid unstable buildings and dangerous infrastructure after damage.',
    },
  },
});
