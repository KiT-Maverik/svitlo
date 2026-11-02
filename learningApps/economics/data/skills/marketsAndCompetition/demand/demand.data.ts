import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { changeInQuantityDemanded_Skill_Data, lawOfDemand_Skill_Data, shiftInDemand_Skill_Data } from './skills';

export const demand_SkillGroup_Data = buildSkillGroupConfig({
  slug: "demand",
  id: "24d97ba4-0b71-46e0-822f-3de908c5517a",
  name: {
    en: "Попит",
  },
  skills: {
    changeInQuantityDemanded: changeInQuantityDemanded_Skill_Data,
    lawOfDemand: lawOfDemand_Skill_Data,
    shiftInDemand: shiftInDemand_Skill_Data,
  },
  description: {
    methodological: "Desired purchase quantities depend on price, income, preferences, expectations, and prices of related products.",
    frontend: {
      en: "Discover what affects how much consumers want to buy.",
    },
  },
});
