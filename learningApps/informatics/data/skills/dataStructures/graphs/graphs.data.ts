import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishDirectedAndUndirectedGraphs_Skill_Data, distinguishTreesFromGraphsWithCycles_Skill_Data, distinguishWeightedAndUnweightedGraphs_Skill_Data, explainGraphStructure_Skill_Data, findAPathInAGraph_Skill_Data, identifyAdjacentVertices_Skill_Data } from './skills';

export const graphs_SkillGroup_Data = buildSkillGroupConfig({
  slug: "graphs",
  id: "ac76c24f-09ee-456e-844f-9ebfbd892b0d",
  name: {
    en: "Graphs",
  },
  skills: {
    distinguishDirectedAndUndirectedGraphs: distinguishDirectedAndUndirectedGraphs_Skill_Data,
    distinguishTreesFromGraphsWithCycles: distinguishTreesFromGraphsWithCycles_Skill_Data,
    distinguishWeightedAndUnweightedGraphs: distinguishWeightedAndUnweightedGraphs_Skill_Data,
    explainGraphStructure: explainGraphStructure_Skill_Data,
    findAPathInAGraph: findAPathInAGraph_Skill_Data,
    identifyAdjacentVertices: identifyAdjacentVertices_Skill_Data,
  },
  description: {
    methodological: "Graphs describe vertices and connections, including cycles, directed relationships, and numeric edge weights.",
    frontend: {
      en: "Discover how graphs represent places, objects and their connections.",
    },
  },
});
