import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const analyzeMoralDisagreement_Skill_Data = buildSkillConfig({
  slug: "analyzeMoralDisagreement",
  id: "c398f21a-1a8e-478f-bcc9-37fc13b88875",
  name: {
    en: "Analyze moral disagreement",
  },
  description: {
    methodological: "Identify whether disputants differ about facts, principles, or the status of moral claims, and what kinds of reasons could address those differences.",
    frontend: {
      en: "Separate disagreements over facts from disagreements over moral standards.",
    },
  },
});
