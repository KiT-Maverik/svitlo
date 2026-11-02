import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const deriveAPredictionFromAHypothesis_Skill_Data = buildSkillConfig({
  slug: "deriveAPredictionFromAHypothesis",
  id: "74f84cb0-893a-4c34-8006-5733c2338011",
  name: {
    en: "Derive a prediction from a hypothesis",
  },
  description: {
    methodological: "Explain what should be observed under specified conditions if a proposed explanation is correct.",
    frontend: {
      en: "Predict what should happen if a hypothesis is correct under stated conditions.",
    },
  },
});
