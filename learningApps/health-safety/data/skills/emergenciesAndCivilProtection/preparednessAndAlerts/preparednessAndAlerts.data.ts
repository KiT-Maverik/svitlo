import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { contactEmergencyServices_Skill_Data, developAnEmergencyPlan_Skill_Data, prepareEssentialEmergencySupplies_Skill_Data, understandEmergencyAlerts_Skill_Data } from './skills';

export const preparednessAndAlerts_SkillGroup_Data = buildSkillGroupConfig({
  slug: "preparednessAndAlerts",
  id: "46337d52-efc7-4dff-bab7-e7ed47375763",
  name: {
    en: "Preparedness and Alerts",
  },
  skills: {
    contactEmergencyServices: contactEmergencyServices_Skill_Data,
    developAnEmergencyPlan: developAnEmergencyPlan_Skill_Data,
    prepareEssentialEmergencySupplies: prepareEssentialEmergencySupplies_Skill_Data,
    understandEmergencyAlerts: understandEmergencyAlerts_Skill_Data,
  },
  description: {
    methodological: "Effective readiness considers local hazards, people requiring assistance, communication failures, and the difference between a warning and an instruction.",
    frontend: {
      en: "Discover how official alerts and advance planning support emergency readiness.",
    },
  },
});
