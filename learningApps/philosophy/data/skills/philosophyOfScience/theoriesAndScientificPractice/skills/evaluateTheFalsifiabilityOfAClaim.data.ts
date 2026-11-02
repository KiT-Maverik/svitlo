import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateTheFalsifiabilityOfAClaim_Skill_Data = buildSkillConfig({
  slug: "evaluateTheFalsifiabilityOfAClaim",
  id: "980c7176-434c-45c9-978e-25477bcf4f9e",
  name: {
    en: "Evaluate the falsifiability of a claim",
  },
  description: {
    methodological: "Assess whether plausible observations could count against a proposition without treating falsifiability as the sole criterion of science.",
    frontend: {
      en: "Ask what observations could count against a scientific claim.",
    },
  },
});
