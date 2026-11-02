import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { changeInQuantitySupplied_Skill_Data, lawOfSupply_Skill_Data, shiftInSupply_Skill_Data } from './skills';

export const supply_SkillGroup_Data = buildSkillGroupConfig({
  slug: "supply",
  id: "30717fd6-6129-4cb7-ba9d-41c997ceffab",
  name: {
    en: "Пропозиція",
  },
  skills: {
    changeInQuantitySupplied: changeInQuantitySupplied_Skill_Data,
    lawOfSupply: lawOfSupply_Skill_Data,
    shiftInSupply: shiftInSupply_Skill_Data,
  },
  description: {
    methodological: "Sellers' production decisions depend on price, costs, productivity, expectations, and resource availability.",
    frontend: {
      en: "Explore what determines how much producers are willing to offer.",
    },
  },
});
