import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const questionnaireResearch_Skill_Data = buildSkillConfig({
  slug: "questionnaireResearch",
  id: "7b9fff4f-2e71-45c8-834b-62079b1a77a3",
  name: {
    en: "Questionnaire Research",
  },
  description: {
    methodological: "Interpret structured self-reports while considering item wording, response scales, and socially desirable answers.",
    frontend: {
      en: "Interpret questionnaires while accounting for wording and response bias.",
    },
  },
});
