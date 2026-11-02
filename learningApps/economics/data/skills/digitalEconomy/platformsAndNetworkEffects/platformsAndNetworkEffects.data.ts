import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { creatorEconomy_Skill_Data, digitalPlatformCompetition_Skill_Data, directAndIndirectNetworkEffects_Skill_Data, twoSidedMarkets_Skill_Data } from './skills';

export const platformsAndNetworkEffects_SkillGroup_Data = buildSkillGroupConfig({
  slug: "platformsAndNetworkEffects",
  id: "402981d5-9eae-4abe-8b17-630965f4cf7f",
  name: {
    en: "Платформи та мережеві ефекти",
  },
  skills: {
    creatorEconomy: creatorEconomy_Skill_Data,
    digitalPlatformCompetition: digitalPlatformCompetition_Skill_Data,
    directAndIndirectNetworkEffects: directAndIndirectNetworkEffects_Skill_Data,
    twoSidedMarkets: twoSidedMarkets_Skill_Data,
  },
  description: {
    methodological: "A service's value may depend on participant numbers on each side of the market, access rules, and economies of scale.",
    frontend: {
      en: "Discover how platforms become more useful as more people participate.",
    },
  },
});
