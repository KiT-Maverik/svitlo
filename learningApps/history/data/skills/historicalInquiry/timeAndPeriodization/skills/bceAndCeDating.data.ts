import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const bceAndCeDating_Skill_Data = buildSkillConfig({
  slug: "bceAndCeDating",
  id: "35ba8e99-cbb8-4c15-865a-343f2c740145",
  name: {
    en: "Датування до нашої ери та нашої ери",
  },
  description: {
    methodological: "Interpret years and centuries in both eras and correctly calculate intervals without a year zero in conventional dating.",
    frontend: {
      en: "Read BCE and CE dates and calculate the time between them.",
    },
  },
});
