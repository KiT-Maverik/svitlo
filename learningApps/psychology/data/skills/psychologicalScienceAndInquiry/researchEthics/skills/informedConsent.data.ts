import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const informedConsent_Skill_Data = buildSkillConfig({
  slug: "informedConsent",
  id: "34b406e3-7443-449b-b98f-58e7cc16355e",
  name: {
    en: "Informed Consent",
  },
  description: {
    methodological: "Identify the information required for a voluntary decision to participate, including procedures, foreseeable risks, and withdrawal.",
    frontend: {
      en: "Recognize what participants should know before agreeing to join a study.",
    },
  },
});
