import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishLeafAndInternalTreeNodes_Skill_Data, explainBinarySearchTrees_Skill_Data, explainTreeStructure_Skill_Data, findAPathInATree_Skill_Data } from './skills';

export const trees_SkillGroup_Data = buildSkillGroupConfig({
  slug: "trees",
  id: "20b9ef09-900e-4575-9c59-85f73c800db1",
  name: {
    en: "Trees",
  },
  skills: {
    distinguishLeafAndInternalTreeNodes: distinguishLeafAndInternalTreeNodes_Skill_Data,
    explainBinarySearchTrees: explainBinarySearchTrees_Skill_Data,
    explainTreeStructure: explainTreeStructure_Skill_Data,
    findAPathInATree: findAPathInATree_Skill_Data,
  },
  description: {
    methodological: "Trees organize nodes and edges into acyclic hierarchies; binary search trees also impose an ordering rule on keys.",
    frontend: {
      en: "Explore how trees organize information through parent–child connections.",
    },
  },
});
