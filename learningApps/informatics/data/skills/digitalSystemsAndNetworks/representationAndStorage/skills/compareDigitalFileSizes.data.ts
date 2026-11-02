import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareDigitalFileSizes_Skill_Data = buildSkillConfig({
  slug: "compareDigitalFileSizes",
  id: "0b0ba4f0-7029-4d74-b68b-7943a3ecaf88",
  name: {
    en: "Compare Digital File Sizes",
  },
  description: {
    methodological: "Relate stored byte counts to file sizes, compare measurement units correctly, and explain why visually similar materials may differ in size because of format or compression.",
    frontend: {
      en: "Compare file sizes and explain why format and compression make a difference.",
    },
  },
});
