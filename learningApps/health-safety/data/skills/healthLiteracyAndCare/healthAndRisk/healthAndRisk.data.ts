import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assessHealthRelatedRisk_Skill_Data, choosePreventiveHealthMeasures_Skill_Data, identifyFactorsAffectingHealth_Skill_Data, interpretBasicHealthMeasurements_Skill_Data, recognizeChangesInHealthStatus_Skill_Data } from './skills';

export const healthAndRisk_SkillGroup_Data = buildSkillGroupConfig({
  slug: "healthAndRisk",
  id: "f314106d-d5d8-4fb5-b8ae-562458c9bd31",
  name: {
    en: "Health and Risk",
  },
  skills: {
    assessHealthRelatedRisk: assessHealthRelatedRisk_Skill_Data,
    choosePreventiveHealthMeasures: choosePreventiveHealthMeasures_Skill_Data,
    identifyFactorsAffectingHealth: identifyFactorsAffectingHealth_Skill_Data,
    interpretBasicHealthMeasurements: interpretBasicHealthMeasurements_Skill_Data,
    recognizeChangesInHealthStatus: recognizeChangesInHealthStatus_Skill_Data,
  },
  description: {
    methodological: "Health depends on interacting physical, psychological, social, and environmental conditions. Risk factors affect probability rather than determining an individual's diagnosis.",
    frontend: {
      en: "Explore how different conditions and choices can influence health risks.",
    },
  },
});
