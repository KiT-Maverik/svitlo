import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { paymentFeesAndTerms_Skill_Data, paymentMethods_Skill_Data, transactionConfirmation_Skill_Data } from './skills';

export const paymentsAndTransactions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "paymentsAndTransactions",
  id: "34bda5b6-a98b-4e4f-996b-0c12c9258c35",
  name: {
    en: "Розрахунки та платежі",
  },
  skills: {
    paymentFeesAndTerms: paymentFeesAndTerms_Skill_Data,
    paymentMethods: paymentMethods_Skill_Data,
    transactionConfirmation: transactionConfirmation_Skill_Data,
  },
  description: {
    methodological: "Money transfers involve different instruments, fees, timing, risks, and documentary evidence.",
    frontend: {
      en: "Discover how different payment methods work and what to check.",
    },
  },
});
