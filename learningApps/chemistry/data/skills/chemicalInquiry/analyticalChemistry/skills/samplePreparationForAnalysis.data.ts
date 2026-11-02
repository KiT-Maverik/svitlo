import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const samplePreparationForAnalysis_Skill_Data = buildSkillConfig({
  slug: "samplePreparationForAnalysis",
  id: "5b155555-02b4-4dee-81aa-fe56824b7e44",
  name: {
    en: "Sample Preparation for Analysis",
  },
  description: {
    methodological: "Choose sample treatment, such as dissolution, extraction or dilution, to make a specified analyte measurable while considering contamination and analyte loss.",
    frontend: {
      en: "Choose ways to prepare a sample while avoiding contamination or material loss.",
    },
  },
});
