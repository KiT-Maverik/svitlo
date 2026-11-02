import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const findAPathInATree_Skill_Data = buildSkillConfig({
  slug: "findAPathInATree",
  id: "90e25d5f-4911-4c9b-ae07-5b0e4f469b5c",
  name: {
    en: "Find a Path in a Tree",
  },
  description: {
    methodological: "Identify the actual sequence of connected nodes between two positions without inventing nonexistent links.",
    frontend: {
      en: "Follow the connected route between two nodes in a tree.",
    },
  },
});
