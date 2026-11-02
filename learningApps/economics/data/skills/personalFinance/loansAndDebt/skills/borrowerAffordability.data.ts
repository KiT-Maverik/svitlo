import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const borrowerAffordability_Skill_Data = buildSkillConfig({
  slug: "borrowerAffordability",
  id: "3a5a4148-1d72-4e0a-8e96-9a71621fc96f",
  name: {
    en: "Платоспроможність позичальника",
  },
  description: {
    methodological: "Compare debt payments, income stability, and other obligations under different scenarios.",
    frontend: {
      en: "Explore whether expected income can support planned loan payments.",
    },
  },
});
