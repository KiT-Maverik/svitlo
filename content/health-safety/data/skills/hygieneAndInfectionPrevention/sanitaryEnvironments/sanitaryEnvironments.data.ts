import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  cleaningAndDisinfection_Skill_Data,
  indoorAirAndVentilation_Skill_Data,
  safeDrinkingWater_Skill_Data,
} from './skills';

export const sanitaryEnvironments_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'sanitaryEnvironments',
  id: '586f5efd-49e8-495f-945c-14fc1bfcd5a0',
  name: {
    en: 'Sanitary Environments',
  },
  skills: {
    cleaningAndDisinfection: cleaningAndDisinfection_Skill_Data,
    indoorAirAndVentilation: indoorAirAndVentilation_Skill_Data,
    safeDrinkingWater: safeDrinkingWater_Skill_Data,
  },
  description: {
    methodological:
      'Water, indoor air, surfaces, and sanitation infrastructure influence exposure and should be managed according to actual contamination pathways.',
    frontend: {
      en: 'Explore how safe water, air and surfaces affect infection risk.',
    },
  },
});
