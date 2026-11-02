import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distributionChannels_Skill_Data, distributionCosts_Skill_Data, wholesaleTrade_Skill_Data } from './skills';

export const salesChannelsAndDistribution_SkillGroup_Data = buildSkillGroupConfig({
  slug: "salesChannelsAndDistribution",
  id: "6131a2e9-3592-41cc-b0e7-af5ebc270965",
  name: {
    en: "Канали збуту та дистрибуція",
  },
  skills: {
    distributionChannels: distributionChannels_Skill_Data,
    distributionCosts: distributionCosts_Skill_Data,
    wholesaleTrade: wholesaleTrade_Skill_Data,
  },
  description: {
    methodological: "Goods can reach end consumers through different numbers of intermediaries, wholesale transactions, warehouses, and transport; channel choice affects costs, availability, and control over sales.",
    frontend: {
      en: "Discover how products travel from producers to customers.",
    },
  },
});
