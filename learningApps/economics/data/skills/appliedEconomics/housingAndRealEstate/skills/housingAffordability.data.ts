import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const housingAffordability_Skill_Data = buildSkillConfig({
  slug: "housingAffordability",
  id: "3d338586-e7a7-40af-94b4-03c0cf6dc5b9",
  name: {
    en: "Доступність житла",
  },
  description: {
    methodological: "Compare purchase or rental expenses with income, debts, quality, and location; distinguish affordability from market price alone.",
    frontend: {
      en: "Find out what makes a home affordable for a particular household.",
    },
  },
});
