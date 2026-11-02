import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainSeriesConnectionsOfElectricCircuitComponents_Skill_Data = buildSkillConfig({
  slug: "explainSeriesConnectionsOfElectricCircuitComponents",
  id: "7db07119-89dd-4607-8187-957dfc1d8007",
  name: {
    en: "Explain series connections of electric circuit components",
  },
  description: {
    methodological: "Components connected in series share a common current path: the same current passes through each, and the total voltage across the combination is the sum of the voltages across the individual components. Breaking the single path stops current through all those components.",
    frontend: {
      en: "Explore how components on one path share current in a series circuit.",
    },
  },
});
