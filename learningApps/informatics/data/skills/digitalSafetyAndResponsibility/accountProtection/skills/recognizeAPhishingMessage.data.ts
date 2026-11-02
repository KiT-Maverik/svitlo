import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeAPhishingMessage_Skill_Data = buildSkillConfig({
  slug: "recognizeAPhishingMessage",
  id: "488abc6b-a03e-4127-9457-974181354a79",
  name: {
    en: "Recognize a Phishing Message",
  },
  description: {
    methodological: "Identify attempts to elicit passwords, confirmation codes, or secrets through impersonation, urgency, threats, or fake forms. This examines intent and social-engineering tactics; technical domain checks and safe responses are separate skills.",
    frontend: {
      en: "Recognize messages that impersonate others to steal passwords or codes.",
    },
  },
});
