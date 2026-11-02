import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const hiddenChargesAndForcedExtras_Skill_Data = buildSkillConfig({
  slug: "hiddenChargesAndForcedExtras",
  id: "66aa7e7e-76d2-4b38-a2cf-db123c135aff",
  name: {
    en: "Приховані витрати й нав’язані опції",
  },
  description: {
    methodological: "Identify fees disclosed only at payment, paid options selected by default, and add-ons that change total transaction costs; obstacles to canceling a completed subscription are a separate competency.",
    frontend: {
      en: "Spot extra charges and add-ons that make an offer cost more than it first appears.",
    },
  },
});
