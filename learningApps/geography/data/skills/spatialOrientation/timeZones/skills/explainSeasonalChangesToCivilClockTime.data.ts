import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainSeasonalChangesToCivilClockTime_Skill_Data = buildSkillConfig({
  slug: "explainSeasonalChangesToCivilClockTime",
  id: "deac7226-c16d-4b55-96b1-d7a91c9d03e5",
  name: {
    en: "Explain seasonal changes to civil clock time",
  },
  description: {
    methodological: "Identify that some jurisdictions change their legal UTC offsets seasonally while others do not, and that the applicable rule depends on place and date rather than a universal daylight-saving schedule.",
    frontend: {
      en: "Recognize why some locations change their clocks seasonally while others do not.",
    },
  },
});
