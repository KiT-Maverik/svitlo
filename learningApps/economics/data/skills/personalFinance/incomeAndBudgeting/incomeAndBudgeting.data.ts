import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { expenseTracking_Skill_Data, financialGoals_Skill_Data, personalBudget_Skill_Data, personalIncomeSources_Skill_Data } from './skills';

export const incomeAndBudgeting_SkillGroup_Data = buildSkillGroupConfig({
  slug: "incomeAndBudgeting",
  id: "3be00d44-63ce-44f3-b834-de556de97751",
  name: {
    en: "Доходи та бюджет",
  },
  skills: {
    expenseTracking: expenseTracking_Skill_Data,
    financialGoals: financialGoals_Skill_Data,
    personalBudget: personalBudget_Skill_Data,
    personalIncomeSources: personalIncomeSources_Skill_Data,
  },
  description: {
    methodological: "Money planning begins by understanding sources of income, recurring obligations, and the limits of available spending.",
    frontend: {
      en: "Explore how income and expenses shape a household budget.",
    },
  },
});
