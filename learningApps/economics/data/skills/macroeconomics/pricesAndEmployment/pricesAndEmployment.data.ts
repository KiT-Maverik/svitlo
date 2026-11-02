import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { causesAndMechanismsOfInflation_Skill_Data, consumerPriceIndex_Skill_Data, inflationAndDeflation_Skill_Data, laborForceParticipationRate_Skill_Data, typesOfUnemployment_Skill_Data, unemploymentRate_Skill_Data } from './skills';

export const pricesAndEmployment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "pricesAndEmployment",
  id: "569a685b-d88e-4429-be52-d8ba505df4d6",
  name: {
    en: "Ціни та зайнятість",
  },
  skills: {
    causesAndMechanismsOfInflation: causesAndMechanismsOfInflation_Skill_Data,
    consumerPriceIndex: consumerPriceIndex_Skill_Data,
    inflationAndDeflation: inflationAndDeflation_Skill_Data,
    laborForceParticipationRate: laborForceParticipationRate_Skill_Data,
    typesOfUnemployment: typesOfUnemployment_Skill_Data,
    unemploymentRate: unemploymentRate_Skill_Data,
  },
  description: {
    methodological: "Changes in the general price level and labor utilization have different causes and effects.",
    frontend: {
      en: "Explore how inflation and unemployment are measured and explained.",
    },
  },
});
