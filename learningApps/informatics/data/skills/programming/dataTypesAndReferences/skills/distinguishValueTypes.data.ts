import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishValueTypes_Skill_Data = buildSkillConfig({
  slug: "distinguishValueTypes",
  id: "3d273538-7d5f-4cc4-b011-ea5bd9352003",
  name: {
    en: "Distinguish Value Types",
  },
  description: {
    methodological: "Identify whether a value is numeric, textual, or Boolean and which operations are meaningful for it. Numeric addition and string concatenation may look similar but follow different rules.",
    frontend: {
      en: "Tell whether a value is numeric, textual or Boolean and what it can do.",
    },
  },
});
