import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { drinkingWaterTreatment_Skill_Data, identifyDistributionLeakage_Skill_Data, pressureManagement_Skill_Data, traceDrinkingWaterSupply_Skill_Data } from './skills';

export const waterSupply_SkillGroup_Data = buildSkillGroupConfig({
  slug: "waterSupply",
  id: "535ed8e3-ba53-473c-9c60-c368167e5b9b",
  name: {
    en: "Water Supply",
  },
  skills: {
    drinkingWaterTreatment: drinkingWaterTreatment_Skill_Data,
    identifyDistributionLeakage: identifyDistributionLeakage_Skill_Data,
    pressureManagement: pressureManagement_Skill_Data,
    traceDrinkingWaterSupply: traceDrinkingWaterSupply_Skill_Data,
  },
  description: {
    methodological: "Safe, reliable distribution requires treatment and controlled hydraulic delivery from sources to users.",
    frontend: {
      en: "Discover how water reaches homes and other places safely.",
    },
  },
});
