import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainParallelConnectionsOfElectricCircuitComponents_Skill_Data = buildSkillConfig({
  slug: "explainParallelConnectionsOfElectricCircuitComponents",
  id: "1404eb22-b3c7-46ef-9dd4-0a5711fc4bfa",
  name: {
    en: "Explain parallel connections of electric circuit components",
  },
  description: {
    methodological: "Parallel branches connect to the same two nodes, so each has the same voltage and the total current is divided among the branches. Opening one branch does not necessarily stop current in the others.",
    frontend: {
      en: "Understand how separate parallel branches share voltage and split current.",
    },
  },
});
