import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const windTurbines_Skill_Data = buildSkillConfig({
  slug: 'windTurbines',
  id: '8e9026a4-bca4-4106-b6df-b0228253cbb0',
  name: {
    en: 'Wind turbines',
  },
  description: {
    methodological: 'Trace rotor, drive and generator functions within a wind-energy installation.',
    frontend: {
      en: 'Trace how a wind turbine drives a generator.',
    },
  },
});
