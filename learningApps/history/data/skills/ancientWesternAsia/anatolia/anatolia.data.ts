import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { anatolianTradeNetworks_Skill_Data, hittiteKingdom_Skill_Data, urartu_Skill_Data } from './skills';

export const anatolia_SkillGroup_Data = buildSkillGroupConfig({
  slug: "anatolia",
  id: "9d8bb3ae-50c3-4140-bfab-1c3c35d3ddcd",
  name: {
    en: "Анатолія",
  },
  skills: {
    anatolianTradeNetworks: anatolianTradeNetworks_Skill_Data,
    hittiteKingdom: hittiteKingdom_Skill_Data,
    urartu: urartu_Skill_Data,
  },
  description: {
    methodological: "Mountain and plateau regions between the Aegean and Mesopotamia supported distinct kingdoms and cultural exchanges.",
    frontend: {
      en: "Explore the ancient kingdoms of Anatolia.",
    },
  },
});
