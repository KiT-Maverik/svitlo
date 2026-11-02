import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const transactionCosts_Skill_Data = buildSkillConfig({
  slug: "transactionCosts",
  id: "5ef7f8fd-7cce-457f-8c5f-bcff7836ec5e",
  name: {
    en: "Трансакційні витрати",
  },
  description: {
    methodological: "Identify the costs of searching, negotiating, verifying, and enforcing an agreement beyond the price of the good itself.",
    frontend: {
      en: "Recognize the time and effort involved in making an exchange.",
    },
  },
});
