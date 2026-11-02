import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainLimitsOfPrediction_Skill_Data = buildSkillConfig({
  slug: "explainLimitsOfPrediction",
  id: "83daf43c-1d12-4445-b8b8-aff00415b6ee",
  name: {
    en: "Explain Limits of Prediction",
  },
  description: {
    methodological: "Explain why a known probability does not determine the outcome of one trial and why a faulty model can give misleading forecasts. A rare win does not refute a correct low-probability estimate.",
    frontend: {
      en: "Explain why knowing the odds does not predict the result of a single attempt.",
    },
  },
});
