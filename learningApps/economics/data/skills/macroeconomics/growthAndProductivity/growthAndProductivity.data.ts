import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { driversOfLongTermGrowth_Skill_Data, economicGrowth_Skill_Data, potentialOutput_Skill_Data } from './skills';

export const growthAndProductivity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "growthAndProductivity",
  id: "970fc3fa-33f3-43fe-80d0-b4e95a6c0132",
  name: {
    en: "Зростання та продуктивність",
  },
  skills: {
    driversOfLongTermGrowth: driversOfLongTermGrowth_Skill_Data,
    economicGrowth: economicGrowth_Skill_Data,
    potentialOutput: potentialOutput_Skill_Data,
  },
  description: {
    methodological: "Long-run aggregate output depends on technology, capital, labor, and institutional quality.",
    frontend: {
      en: "Discover what helps an economy produce more over the long term.",
    },
  },
});
