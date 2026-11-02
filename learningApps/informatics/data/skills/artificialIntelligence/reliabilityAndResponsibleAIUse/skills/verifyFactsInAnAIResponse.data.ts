import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const verifyFactsInAnAIResponse_Skill_Data = buildSkillConfig({
  slug: "verifyFactsInAnAIResponse",
  id: "4f039591-11ed-4341-90ab-7389f7ce8efe",
  name: {
    en: "Verify Facts in an AI Response",
  },
  description: {
    methodological: "Identify verifiable claims from model output and compare them with independent trustworthy sources, checking provenance, date, and context. An AI response cannot confirm itself or another retelling of the same response.",
    frontend: {
      en: "Check factual claims from an AI response using reliable independent sources.",
    },
  },
});
