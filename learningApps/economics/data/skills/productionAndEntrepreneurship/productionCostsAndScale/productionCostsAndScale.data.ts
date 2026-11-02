import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { averageProductionCosts_Skill_Data, economicProfit_Skill_Data, economiesOfScale_Skill_Data, fixedAndVariableCosts_Skill_Data, marginalProductionCost_Skill_Data } from './skills';

export const productionCostsAndScale_SkillGroup_Data = buildSkillGroupConfig({
  slug: "productionCostsAndScale",
  id: "dcde5c13-0b61-48f5-b2cc-f0ac7e27a6b1",
  name: {
    en: "Витрати та масштаб",
  },
  skills: {
    averageProductionCosts: averageProductionCosts_Skill_Data,
    economicProfit: economicProfit_Skill_Data,
    economiesOfScale: economiesOfScale_Skill_Data,
    fixedAndVariableCosts: fixedAndVariableCosts_Skill_Data,
    marginalProductionCost: marginalProductionCost_Skill_Data,
  },
  description: {
    methodological: "Economic production decisions account for opportunity costs, time horizons, and how unit costs change with output.",
    frontend: {
      en: "Explore how the costs of production change with a firm's scale.",
    },
  },
});
