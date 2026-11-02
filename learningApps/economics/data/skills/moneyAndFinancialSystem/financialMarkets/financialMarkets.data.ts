import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assetRiskAndReturn_Skill_Data, bonds_Skill_Data, interestRates_Skill_Data, stocks_Skill_Data } from './skills';

export const financialMarkets_SkillGroup_Data = buildSkillGroupConfig({
  slug: "financialMarkets",
  id: "a1243a31-9b27-42ef-893f-e9624aafc724",
  name: {
    en: "Фінансові ринки",
  },
  skills: {
    assetRiskAndReturn: assetRiskAndReturn_Skill_Data,
    bonds: bonds_Skill_Data,
    interestRates: interestRates_Skill_Data,
    stocks: stocks_Skill_Data,
  },
  description: {
    methodological: "Capital and risk are transferred through contractual claims and ownership rights whose prices depend on expectations.",
    frontend: {
      en: "Explore how people trade financial claims and ownership interests.",
    },
  },
});
