import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictAnOutcomeFromARule_Skill_Data = buildSkillConfig({
  slug: "predictAnOutcomeFromARule",
  id: "47f930b4-e3a8-47a0-b9e1-f971c9c1893a",
  name: {
    en: "Predict an Outcome from a Rule",
  },
  description: {
    methodological: "Derive the next state or value from an explicit rule and initial conditions, such as one transition of a finite-state machine. Unlike statistical forecasting, the rule determines the outcome here.",
    frontend: {
      en: "Work out what happens next when a rule and starting state are known.",
    },
  },
});
