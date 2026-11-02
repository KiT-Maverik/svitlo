import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateAnInferenceToTheBestExplanation_Skill_Data = buildSkillConfig({
  slug: "evaluateAnInferenceToTheBestExplanation",
  id: "f5072be7-5672-40e9-815f-6c5fa8654a6a",
  name: {
    en: "Evaluate an inference to the best explanation",
  },
  description: {
    methodological: "Compare hypotheses by how well they explain evidence, their assumptions, and their fit with alternative explanations.",
    frontend: {
      en: "Choose between possible explanations using evidence and assumptions.",
    },
  },
});
