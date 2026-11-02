import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainGraphStructure_Skill_Data = buildSkillConfig({
  slug: "explainGraphStructure",
  id: "d399fca3-1e34-435a-82f0-b40345399ef4",
  name: {
    en: "Explain Graph Structure",
  },
  description: {
    methodological: "Represent a road or social network as vertices and edges without assuming every graph is a tree.",
    frontend: {
      en: "Recognize graph vertices and the edges connecting them.",
    },
  },
});
