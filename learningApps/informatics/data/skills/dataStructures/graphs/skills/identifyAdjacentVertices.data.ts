import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyAdjacentVertices_Skill_Data = buildSkillConfig({
  slug: "identifyAdjacentVertices",
  id: "9e17a09a-41b4-46b5-b48f-132edc5d8f32",
  name: {
    en: "Identify Adjacent Vertices",
  },
  description: {
    methodological: "Find vertices directly connected to a given vertex and distinguish them from vertices reached through intermediate nodes.",
    frontend: {
      en: "Identify the nodes directly connected to another node.",
    },
  },
});
