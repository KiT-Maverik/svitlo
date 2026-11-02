import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evidenceQuality_Skill_Data = buildSkillConfig({
  slug: "evidenceQuality",
  id: "5c4aeafb-6af7-4fca-a850-d1b59bcd3ed1",
  name: {
    en: "Evidence Quality",
  },
  description: {
    methodological: "Weigh converging studies, effect magnitude, uncertainty, and publication bias instead of relying on one striking result.",
    frontend: {
      en: "Compare research findings by their strength, uncertainty and possible biases.",
    },
  },
});
