import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const materialSuitabilityAssessment_Skill_Data = buildSkillConfig({
  slug: "materialSuitabilityAssessment",
  id: "e23fd916-70e4-400b-b8fc-0be4ef9ffb5a",
  name: {
    en: "Material suitability assessment",
  },
  description: {
    methodological: "Evaluate which material properties and processing limitations meet the expected loads and service environment. This is a reusable material-compatibility judgment rather than an individual choice question.",
    frontend: {
      en: "Evaluate whether a material can meet the demands of a particular use.",
    },
  },
});
