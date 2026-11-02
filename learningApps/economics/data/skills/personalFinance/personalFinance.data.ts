import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { financialRisksAndProtection_SkillGroup_Data } from './financialRisksAndProtection/financialRisksAndProtection.data';
import { incomeAndBudgeting_SkillGroup_Data } from './incomeAndBudgeting/incomeAndBudgeting.data';
import { loansAndDebt_SkillGroup_Data } from './loansAndDebt/loansAndDebt.data';
import { paymentsAndTransactions_SkillGroup_Data } from './paymentsAndTransactions/paymentsAndTransactions.data';
import { savingAndInvesting_SkillGroup_Data } from './savingAndInvesting/savingAndInvesting.data';

export const personalFinance_SkillDomain_Data = buildSkillDomainConfig({
  slug: "personalFinance",
  id: "9e8a24f0-4fc5-40a4-9cf9-a259981fc157",
  name: {
    en: "Особисті фінанси",
  },
  groups: {
    financialRisksAndProtection: financialRisksAndProtection_SkillGroup_Data,
    incomeAndBudgeting: incomeAndBudgeting_SkillGroup_Data,
    loansAndDebt: loansAndDebt_SkillGroup_Data,
    paymentsAndTransactions: paymentsAndTransactions_SkillGroup_Data,
    savingAndInvesting: savingAndInvesting_SkillGroup_Data,
  },
  description: {
    methodological: "Households receive income, make payments, and decide how to save, borrow, and manage risks. This domain develops practical literacy rather than personalized investment advice.",
    frontend: {
      en: "Learn to plan money, understand borrowing, and manage everyday financial decisions.",
    },
  },
});
