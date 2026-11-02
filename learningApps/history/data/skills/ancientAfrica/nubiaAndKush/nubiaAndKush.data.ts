import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { kermaCulture_Skill_Data, kingdomOfKush_Skill_Data, meroe_Skill_Data, nileCulturalExchange_Skill_Data } from './skills';

export const nubiaAndKush_SkillGroup_Data = buildSkillGroupConfig({
  slug: "nubiaAndKush",
  id: "17daa14b-d8b4-40b9-af0b-b37ed9037d3b",
  name: {
    en: "Нубія та Куш",
  },
  skills: {
    kermaCulture: kermaCulture_Skill_Data,
    kingdomOfKush: kingdomOfKush_Skill_Data,
    meroe: meroe_Skill_Data,
    nileCulturalExchange: nileCulturalExchange_Skill_Data,
  },
  description: {
    methodological: "Middle Nile societies formed independent political and cultural centers with complex relations to Egypt.",
    frontend: {
      en: "Discover the independent societies of ancient Nubia and Kush.",
    },
  },
});
