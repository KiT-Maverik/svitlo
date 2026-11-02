import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const manageFoodAllergyRisks_Skill_Data = buildSkillConfig({
  slug: "manageFoodAllergyRisks",
  id: "d8aba279-b0f8-4769-983f-6b7b6859bf1d",
  name: {
    en: "Manage food allergy risks",
  },
  description: {
    methodological: "Identify allergens and cross-contact warnings, verify ingredients, take appropriate avoidance precautions and understand when an allergic reaction requires urgent care.",
    frontend: {
      en: "Identify allergens and avoid dangerous ingredient cross-contact.",
    },
  },
});
