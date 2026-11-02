import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { borrowerAffordability_Skill_Data, creditHistory_Skill_Data, latePaymentConsequences_Skill_Data, totalCostOfCredit_Skill_Data } from './skills';

export const loansAndDebt_SkillGroup_Data = buildSkillGroupConfig({
  slug: "loansAndDebt",
  id: "608de14a-afdd-4e1c-b41b-39dc9fd2fbc6",
  name: {
    en: "Позики та борги",
  },
  skills: {
    borrowerAffordability: borrowerAffordability_Skill_Data,
    creditHistory: creditHistory_Skill_Data,
    latePaymentConsequences: latePaymentConsequences_Skill_Data,
    totalCostOfCredit: totalCostOfCredit_Skill_Data,
  },
  description: {
    methodological: "Borrowing permits earlier spending but creates future payments and obligations.",
    frontend: {
      en: "Understand the costs and commitments of borrowing money.",
    },
  },
});
