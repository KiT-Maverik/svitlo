import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainPrimaryKeys_Skill_Data = buildSkillConfig({
  slug: "explainPrimaryKeys",
  id: "3ee1fbbd-57cb-4b0a-afed-70a992147fa9",
  name: {
    en: "Explain Primary Keys",
  },
  description: {
    methodological: "Explain why a record needs a stable identifier unique within its table and why a person's name or a title is not always an appropriate key.",
    frontend: {
      en: "Explain why a database needs a stable unique key for each record.",
    },
  },
});
