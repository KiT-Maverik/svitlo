import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const understandEmergencyAlerts_Skill_Data = buildSkillConfig({
  slug: "understandEmergencyAlerts",
  id: "262234a3-0bdc-47d7-ad04-6a9b997ba028",
  name: {
    en: "Understand emergency alerts",
  },
  description: {
    methodological: "Distinguish authoritative warnings and protective instructions from rumours, outdated messages, or unverified reposts.",
    frontend: {
      en: "Distinguish official protective warnings from rumors and outdated messages.",
    },
  },
});
