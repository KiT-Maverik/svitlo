import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainEventProbability_Skill_Data = buildSkillConfig({
  slug: "explainEventProbability",
  id: "ab964120-109e-44f8-8af2-9404aa3cebdb",
  name: {
    en: "Explain Event Probability",
  },
  description: {
    methodological: "Estimate or interpret an event's chance using the model and its assumptions, including whether outcomes are equally likely. If a prize is equally likely to occupy any of 100 hiding places, a random first guess has a 1% chance of success.",
    frontend: {
      en: "Estimate the chance of an event using a stated probability model.",
    },
  },
});
