import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const findAPathInAGraph_Skill_Data = buildSkillConfig({
  slug: "findAPathInAGraph",
  id: "a3b8240a-e0d6-4391-92c4-6c1cfa2d6788",
  name: {
    en: "Find a Path in a Graph",
  },
  description: {
    methodological: "Construct a sequence of connected vertices from start to goal while respecting edge directions.",
    frontend: {
      en: "Follow a valid path between vertices while respecting connection directions.",
    },
  },
});
