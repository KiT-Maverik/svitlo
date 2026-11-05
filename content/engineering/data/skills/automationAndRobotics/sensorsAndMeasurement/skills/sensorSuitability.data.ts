import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const sensorSuitability_Skill_Data = buildSkillConfig({
  slug: 'sensorSuitability',
  id: '098eff63-53c5-4236-8144-01be410ef93a',
  name: {
    en: 'Sensor suitability',
  },
  description: {
    methodological:
      'Assess the range, measurement principle, response and environmental limitations against a desired physical measurement. Choosing a catalog item is an assessment task, not a distinct Skill.',
    frontend: {
      en: 'Choose a sensor that measures the physical condition a system needs.',
    },
  },
});
