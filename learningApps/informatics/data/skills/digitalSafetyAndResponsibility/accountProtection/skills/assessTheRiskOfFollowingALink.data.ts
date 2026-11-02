import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessTheRiskOfFollowingALink_Skill_Data = buildSkillConfig({
  slug: "assessTheRiskOfFollowingALink",
  id: "db391362-ed9a-41d2-b0ed-06f370ca6f55",
  name: {
    en: "Assess the Risk of Following a Link",
  },
  description: {
    methodological: "Based on context, requested actions, and warning signs, predict possible consequences such as fake login forms, suspicious downloads, or other unwanted behavior. Opening a page does not automatically cause infection; identifying the true domain is a different skill.",
    frontend: {
      en: "Assess what could happen when a suspicious link is opened or followed.",
    },
  },
});
