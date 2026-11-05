import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const pedestrianRoadSafety_Skill_Data = buildSkillConfig({
  slug: 'pedestrianRoadSafety',
  id: '58155722-2a34-4f66-af11-c951908c6674',
  name: {
    en: 'Pedestrian road safety',
  },
  description: {
    methodological:
      'Assess crossings, visibility, traffic movement, signals, and distractions before entering a roadway.',
    frontend: {
      en: 'Choose safer crossing points by watching traffic, signals and visibility.',
    },
  },
});
