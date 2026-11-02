import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const healthcareFinancing_Skill_Data = buildSkillConfig({
  slug: "healthcareFinancing",
  id: "5ca61e05-cebe-490f-83a0-13b3ba27226f",
  name: {
    en: "Фінансування охорони здоров’я",
  },
  description: {
    methodological: "Compare tax-based, insurance-based, and direct payment by access, household financial risk, and system costs.",
    frontend: {
      en: "Compare different ways healthcare is funded.",
    },
  },
});
