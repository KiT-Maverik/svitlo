import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  estimateEnergyDemand_Skill_Data,
  evaluateEnergyEfficiency_Skill_Data,
  loadBalancing_Skill_Data,
} from './skills';

export const energyPerformance_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'energyPerformance',
  id: '00389c0e-1067-4c9e-9d0a-ec3cc596d08d',
  name: {
    en: 'Energy Performance',
  },
  skills: {
    estimateEnergyDemand: estimateEnergyDemand_Skill_Data,
    evaluateEnergyEfficiency: evaluateEnergyEfficiency_Skill_Data,
    loadBalancing: loadBalancing_Skill_Data,
  },
  description: {
    methodological:
      'Consumption varies over time, and practical output is less than input when converters or networks lose energy.',
    frontend: {
      en: 'Explore how engineers estimate demand and improve energy performance.',
    },
  },
});
