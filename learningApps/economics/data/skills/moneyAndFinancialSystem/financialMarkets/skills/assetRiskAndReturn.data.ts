import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assetRiskAndReturn_Skill_Data = buildSkillConfig({
  slug: "assetRiskAndReturn",
  id: "3fcd8e4c-9ca0-4db5-9bf7-520b253dedb4",
  name: {
    en: "Ризик та дохідність активів",
  },
  description: {
    methodological: "Analyze price volatility, expected returns, liquidity, and market relationships of financial assets and portfolios without offering personalized recommendations.",
    frontend: {
      en: "Compare the risks, potential returns, and liquidity of financial assets.",
    },
  },
});
