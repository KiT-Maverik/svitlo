import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyBinaryTreeSearch_Skill_Data = buildSkillConfig({
  slug: "applyBinaryTreeSearch",
  id: "41a94067-8e05-4337-9c9d-8390c291d439",
  name: {
    en: "Apply Binary Tree Search",
  },
  description: {
    methodological: "Compare the key with the current tree node and move into the appropriate subtree until the value is found or the path ends.",
    frontend: {
      en: "Follow the ordered branches of a binary search tree to find a key.",
    },
  },
});
