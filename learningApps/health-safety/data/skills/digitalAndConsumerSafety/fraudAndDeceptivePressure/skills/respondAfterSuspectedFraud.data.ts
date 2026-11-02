import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const respondAfterSuspectedFraud_Skill_Data = buildSkillConfig({
  slug: "respondAfterSuspectedFraud",
  id: "e65eeb0b-3f2a-4405-a83c-a4ebf5e8530d",
  name: {
    en: "Respond after suspected fraud",
  },
  description: {
    methodological: "Stop further interaction, secure affected access, preserve relevant evidence safely, and contact appropriate providers or authorities.",
    frontend: {
      en: "Secure your accounts and seek appropriate help after suspected fraud.",
    },
  },
});
