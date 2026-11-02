import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const simpleInterest_Skill_Data = buildSkillConfig({
  slug: "simpleInterest",
  id: "033ebc6d-27a2-4cc7-aed3-a4dd2396ae9a",
  name: {
    en: "Прості відсотки",
  },
  description: {
    methodological: "Calculate interest on an unchanged principal using a specified rate and time period.",
    frontend: {
      en: "Calculate interest that is earned only on the original amount.",
    },
  },
});
