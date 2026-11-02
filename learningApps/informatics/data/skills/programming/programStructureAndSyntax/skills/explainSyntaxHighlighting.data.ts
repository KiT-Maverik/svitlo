import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainSyntaxHighlighting_Skill_Data = buildSkillConfig({
  slug: "explainSyntaxHighlighting",
  id: "b169b97a-aed5-4e87-a4ba-345f3e86a846",
  name: {
    en: "Explain Syntax Highlighting",
  },
  description: {
    methodological: "Recognize editor coloring of keywords, strings, comments, and names as a visual aid; correctly colored code is not necessarily correct.",
    frontend: {
      en: "Understand what syntax coloring helps reveal and what it cannot prove.",
    },
  },
});
