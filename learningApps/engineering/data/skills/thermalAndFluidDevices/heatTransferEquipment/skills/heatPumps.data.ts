import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const heatPumps_Skill_Data = buildSkillConfig({
  slug: 'heatPumps',
  id: '5175d1f0-2518-4025-9210-c67772d8b371',
  name: {
    en: 'Heat pumps',
  },
  description: {
    methodological: 'Identify how heat is transferred from a source to a destination using external work.',
    frontend: {
      en: 'Understand how a heat pump moves heat using external work.',
    },
  },
});
