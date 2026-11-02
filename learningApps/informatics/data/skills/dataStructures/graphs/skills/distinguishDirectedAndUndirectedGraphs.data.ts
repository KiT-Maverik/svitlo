import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishDirectedAndUndirectedGraphs_Skill_Data = buildSkillConfig({
  slug: "distinguishDirectedAndUndirectedGraphs",
  id: "eed7de30-8bf4-4e59-a4b3-06c965c82c4c",
  name: {
    en: "Distinguish Directed and Undirected Graphs",
  },
  description: {
    methodological: "Determine whether an edge permits travel only one way or represents a connection that can be traversed in both directions.",
    frontend: {
      en: "Tell whether connections have one-way or two-way direction.",
    },
  },
});
