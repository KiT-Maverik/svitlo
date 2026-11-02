import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const budgetDeficitAndSurplus_Skill_Data = buildSkillConfig({
  slug: "budgetDeficitAndSurplus",
  id: "e5ed0944-24c9-4cba-b665-bbf0dd2ab75f",
  name: {
    en: "Бюджетний дефіцит і профіцит",
  },
  description: {
    methodological: "Calculate the difference between revenue and expenditure over a period and distinguish that flow from accumulated government debt.",
    frontend: {
      en: "Understand the difference between a yearly deficit and total public debt.",
    },
  },
});
