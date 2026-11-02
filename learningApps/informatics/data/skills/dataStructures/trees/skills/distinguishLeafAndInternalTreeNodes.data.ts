import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishLeafAndInternalTreeNodes_Skill_Data = buildSkillConfig({
  slug: "distinguishLeafAndInternalTreeNodes",
  id: "ff117d95-52f6-4e7c-92c0-9d92f00c63d9",
  name: {
    en: "Distinguish Leaf and Internal Tree Nodes",
  },
  description: {
    methodological: "A leaf has no children; an internal node has at least one child. The distinction follows the structure, not the node's name.",
    frontend: {
      en: "Distinguish nodes with children from leaf nodes without children.",
    },
  },
});
