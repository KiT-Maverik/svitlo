import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const composite_Skill_Data = buildSkillConfig({
  slug: "composite",
  id: "194dd959-d6ea-4049-82cd-f25a8c0faa45",
  name: {
    en: "Composite",
  },
  description: {
    methodological: "Provide a common contract for individual objects and nested groups, allowing leaves and branches in a tree-like structure to be treated uniformly.",
    frontend: {
      en: "Treat individual objects and groups of objects through a common interface.",
    },
  },
});
