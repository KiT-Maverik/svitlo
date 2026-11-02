import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explanationAndPrediction_Skill_Data = buildSkillConfig({
  slug: "explanationAndPrediction",
  id: "3df569d5-ec86-45a5-b49a-ad4e87aba234",
  name: {
    en: "Explanation and Prediction",
  },
  description: {
    methodological: "Separate a description of observed behavior, a forecast about future behavior, and a proposed mechanism responsible for it.",
    frontend: {
      en: "Separate describing behavior from predicting or explaining its causes.",
    },
  },
});
