import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientNorthernEuropeanEconomies_Skill_Data, balticAmberTrade_Skill_Data, scandinavianIronAge_Skill_Data } from './skills';

export const northernAndBalticEurope_SkillGroup_Data = buildSkillGroupConfig({
  slug: "northernAndBalticEurope",
  id: "bf1a7561-91f6-4c82-8671-9ee2e2081088",
  name: {
    en: "Північна та Балтійська Європа",
  },
  skills: {
    ancientNorthernEuropeanEconomies: ancientNorthernEuropeanEconomies_Skill_Data,
    balticAmberTrade: balticAmberTrade_Skill_Data,
    scandinavianIronAge: scandinavianIronAge_Skill_Data,
  },
  description: {
    methodological: "Rivers and seas connected communities with differing farming, herding, and craft traditions.",
    frontend: {
      en: "Discover how northern Europeans connected through waterways.",
    },
  },
});
