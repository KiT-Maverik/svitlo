import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testableChemicalPredictions_Skill_Data = buildSkillConfig({
  slug: "testableChemicalPredictions",
  id: "d95fcbfc-30d5-4118-bcc6-25a513f98d94",
  name: {
    en: "Testable Chemical Predictions",
  },
  description: {
    methodological: "State a predicted chemical outcome and the evidence that could support or contradict it.",
    frontend: {
      en: "Make a testable prediction about a chemical change and identify supporting evidence.",
    },
  },
});
