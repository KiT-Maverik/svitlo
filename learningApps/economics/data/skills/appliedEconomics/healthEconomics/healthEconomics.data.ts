import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { healthcareFinancing_Skill_Data, healthcareServiceMarkets_Skill_Data, healthInsuranceAndMoralHazard_Skill_Data } from './skills';

export const healthEconomics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "healthEconomics",
  id: "20672d2a-fe53-466d-895f-9fc44aed5d2f",
  name: {
    en: "Охорона здоров’я",
  },
  skills: {
    healthcareFinancing: healthcareFinancing_Skill_Data,
    healthcareServiceMarkets: healthcareServiceMarkets_Skill_Data,
    healthInsuranceAndMoralHazard: healthInsuranceAndMoralHazard_Skill_Data,
  },
  description: {
    methodological: "Healthcare markets involve substantial information asymmetry, insurance arrangements, and external effects of population health.",
    frontend: {
      en: "Discover why healthcare markets operate differently from ordinary product markets.",
    },
  },
});
