import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainAnOpenCircuit_Skill_Data = buildSkillConfig({
  slug: "explainAnOpenCircuit",
  id: "ae81edf7-3910-4f39-aab6-7bc6eb077d94",
  name: {
    en: "Explain an open circuit",
  },
  description: {
    methodological: "Opening a branch interrupts its conducting path; in a circuit with parallel branches, other parts may continue to operate.",
    frontend: {
      en: "Explain what happens when a current path is broken.",
    },
  },
});
