import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainACommit_Skill_Data = buildSkillConfig({
  slug: "explainACommit",
  id: "bee6bd52-b259-49a2-ab94-030c80fe2af5",
  name: {
    en: "Explain a Commit",
  },
  description: {
    methodological: "A Git commit captures a coherent state of changes with an identifier and links to preceding history.",
    frontend: {
      en: "Recognize a commit as an identified snapshot linked to previous work.",
    },
  },
});
