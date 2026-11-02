import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { budgetDeficitAndSurplus_Skill_Data, governmentRevenuesAndExpenditures_Skill_Data, publicDebtSustainability_Skill_Data } from './skills';

export const publicBudgetAndDebt_SkillGroup_Data = buildSkillGroupConfig({
  slug: "publicBudgetAndDebt",
  id: "8a0568e7-420a-4ae1-a410-64489d73faf6",
  name: {
    en: "Бюджет та борг",
  },
  skills: {
    budgetDeficitAndSurplus: budgetDeficitAndSurplus_Skill_Data,
    governmentRevenuesAndExpenditures: governmentRevenuesAndExpenditures_Skill_Data,
    publicDebtSustainability: publicDebtSustainability_Skill_Data,
  },
  description: {
    methodological: "Government revenue and spending occur over time; deficits create future obligations and opportunity costs.",
    frontend: {
      en: "Discover how public budgets, deficits, and debt are connected.",
    },
  },
});
