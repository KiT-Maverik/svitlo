import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const preventHeatRelatedIllness_Skill_Data = buildSkillConfig({
  slug: 'preventHeatRelatedIllness',
  id: 'd17c6e7b-e3ee-434d-884d-d534f0a89d27',
  name: {
    en: 'Prevent heat-related illness',
  },
  description: {
    methodological:
      'Adjust clothing, activity, shade, cooling and fluids to temperature and exertion to reduce overheating; distinguish prevention from first aid after heat illness begins.',
    frontend: {
      en: 'Adjust clothing, shade, exertion and hydration to prevent overheating.',
    },
  },
});
