import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const confoundingVariables_Skill_Data = buildSkillConfig({
  slug: "confoundingVariables",
  id: "33f3d70c-11ba-4627-9f0a-e0de4d3d028a",
  name: {
    en: "Confounding Variables",
  },
  description: {
    methodological: "Identify background factors that move with a proposed cause and could produce an observed group difference.",
    frontend: {
      en: "Identify other factors that might explain a difference between groups.",
    },
  },
});
