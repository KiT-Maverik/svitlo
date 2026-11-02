import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainLearningFromExamples_Skill_Data = buildSkillConfig({
  slug: "explainLearningFromExamples",
  id: "799b85b6-30c0-489b-8e8a-b821a3332a75",
  name: {
    en: "Explain Learning from Examples",
  },
  description: {
    methodological: "Show how training adjusts model parameters using examples and a quality criterion to generalize to new data. Memorizing training examples alone does not establish reliable performance on unseen data.",
    frontend: {
      en: "Explain how examples help a model improve its performance on new inputs.",
    },
  },
});
