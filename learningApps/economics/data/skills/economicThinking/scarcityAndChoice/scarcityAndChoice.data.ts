import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { economicTradeoffs_Skill_Data, marginalAnalysis_Skill_Data, opportunityCost_Skill_Data, productionPossibilitiesFrontier_Skill_Data, resourceScarcity_Skill_Data } from './skills';

export const scarcityAndChoice_SkillGroup_Data = buildSkillGroupConfig({
  slug: "scarcityAndChoice",
  id: "5b95c332-046a-4b3c-9138-3a22825cb4e0",
  name: {
    en: "Обмеженість і вибір",
  },
  skills: {
    economicTradeoffs: economicTradeoffs_Skill_Data,
    marginalAnalysis: marginalAnalysis_Skill_Data,
    opportunityCost: opportunityCost_Skill_Data,
    productionPossibilitiesFrontier: productionPossibilitiesFrontier_Skill_Data,
    resourceScarcity: resourceScarcity_Skill_Data,
  },
  description: {
    methodological: "Because not all wants can be satisfied at once, economic decisions involve comparing alternatives and considering the value of the options forgone.",
    frontend: {
      en: "Explore why limited resources require us to make choices.",
    },
  },
});
