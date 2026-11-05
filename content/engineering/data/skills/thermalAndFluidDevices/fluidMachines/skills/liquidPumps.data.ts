import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const liquidPumps_Skill_Data = buildSkillConfig({
  slug: 'liquidPumps',
  id: 'b25c886a-dbb4-4ede-9264-514c118fd49d',
  name: {
    en: 'Liquid pumps',
  },
  description: {
    methodological: 'Trace the components responsible for delivering flow or pressure to a liquid circuit.',
    frontend: {
      en: 'Trace how a liquid pump provides flow and pressure.',
    },
  },
});
