import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessAnEmailSendersAuthenticity_Skill_Data = buildSkillConfig({
  slug: "assessAnEmailSendersAuthenticity",
  id: "4bbfbe52-aecf-41ab-b745-9b3b94832c21",
  name: {
    en: "Assess an Email Sender's Authenticity",
  },
  description: {
    methodological: "Recognize that a sender's displayed name and image do not prove identity; check the address and an independent communication channel.",
    frontend: {
      en: "Check an email sender's identity beyond the displayed name or picture.",
    },
  },
});
