import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const transactionConfirmation_Skill_Data = buildSkillConfig({
  slug: "transactionConfirmation",
  id: "67449267-c954-43d2-8d5a-382f468e9d4e",
  name: {
    en: "Підтвердження фінансової операції",
  },
  description: {
    methodological: "Interpret the details, status, and purpose of a receipt, account statement, or electronic payment confirmation.",
    frontend: {
      en: "Read a receipt or statement to confirm what happened to a payment.",
    },
  },
});
