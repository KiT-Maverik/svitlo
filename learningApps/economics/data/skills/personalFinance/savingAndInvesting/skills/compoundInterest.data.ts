import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compoundInterest_Skill_Data = buildSkillConfig({
  slug: "compoundInterest",
  id: "083738c5-cc2f-4eac-8898-c2c84c0cec8a",
  name: {
    en: "Складні відсотки",
  },
  description: {
    methodological: "Calculate growth of debt or savings when accrued interest is capitalized, considering compounding frequency and duration.",
    frontend: {
      en: "Explore how interest on interest can increase savings or debt.",
    },
  },
});
