import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretLongitude_Skill_Data = buildSkillConfig({
  slug: "interpretLongitude",
  id: "a61c153c-aba9-47c0-87c7-4e48ba54c14d",
  name: {
    en: "Interpret longitude",
  },
  description: {
    methodological: "Use the reference meridian and longitude values to locate east–west positions without confusing them with latitude.",
    frontend: {
      en: "Read longitude as a position east or west of a reference meridian.",
    },
  },
});
