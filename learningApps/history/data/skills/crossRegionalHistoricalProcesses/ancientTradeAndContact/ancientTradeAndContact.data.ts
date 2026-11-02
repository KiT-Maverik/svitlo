import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientAmericanRiverAndSeaExchange_Skill_Data, ancientIndianOceanTrade_Skill_Data, ancientSilkRoads_Skill_Data, culturalExchange_Skill_Data, technologyTransfer_Skill_Data } from './skills';

export const ancientTradeAndContact_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientTradeAndContact",
  id: "3f9f087a-f429-4c2e-8b62-d3a2d18a405a",
  name: {
    en: "Торгівля та контакти",
  },
  skills: {
    ancientAmericanRiverAndSeaExchange: ancientAmericanRiverAndSeaExchange_Skill_Data,
    ancientIndianOceanTrade: ancientIndianOceanTrade_Skill_Data,
    ancientSilkRoads: ancientSilkRoads_Skill_Data,
    culturalExchange: culturalExchange_Skill_Data,
    technologyTransfer: technologyTransfer_Skill_Data,
  },
  description: {
    methodological: "Exchange networks involved intermediaries; the spread of objects does not necessarily mean the migration of their makers.",
    frontend: {
      en: "Discover how goods and ideas moved between distant communities.",
    },
  },
});
