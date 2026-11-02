import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishOpenSourceFromPubliclyVisibleCode_Skill_Data = buildSkillConfig({
  slug: "distinguishOpenSourceFromPubliclyVisibleCode",
  id: "6e39f271-6cb5-4a40-97fa-1d3d688e9ee7",
  name: {
    en: "Distinguish Open Source from Publicly Visible Code",
  },
  description: {
    methodological: "Being able to read a program's source does not automatically grant permission to modify or redistribute it.",
    frontend: {
      en: "Recognize that visible source code is not automatically open source.",
    },
  },
});
