import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { buildingEconomicModels_Skill_Data, ceterisParibusAssumption_Skill_Data, limitsOfEconomicModels_Skill_Data } from './skills';

export const economicModels_SkillGroup_Data = buildSkillGroupConfig({
  slug: "economicModels",
  id: "f970f789-b7d4-4cfa-bab9-d69227223efc",
  name: {
    en: "Економічні моделі",
  },
  skills: {
    buildingEconomicModels: buildingEconomicModels_Skill_Data,
    ceterisParibusAssumption: ceterisParibusAssumption_Skill_Data,
    limitsOfEconomicModels: limitsOfEconomicModels_Skill_Data,
  },
  description: {
    methodological: "Simplified representations help isolate mechanisms, but their conclusions depend on starting assumptions.",
    frontend: {
      en: "Explore how economists use simplified models to understand decisions.",
    },
  },
});
