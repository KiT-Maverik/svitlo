import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const propertyBasedIdentification_Skill_Data = buildSkillConfig({
  slug: "propertyBasedIdentification",
  id: "505b5ffb-f22d-40f3-b526-3da7185a8c0f",
  name: {
    en: "Property-Based Identification",
  },
  description: {
    methodological: "Compare multiple measured properties with reference information while acknowledging that one matching property may be insufficient.",
    frontend: {
      en: "Compare several measured properties to identify a likely substance.",
    },
  },
});
