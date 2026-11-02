import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const transportDemand_Skill_Data = buildSkillConfig({
  slug: "transportDemand",
  id: "711b3bfd-4ce1-418d-ba51-d4145b3e6d7a",
  name: {
    en: "Попит на транспортні послуги",
  },
  description: {
    methodological: "Analyze how fare or price, travel time, frequency, reliability, and available alternatives affect choice of travel mode.",
    frontend: {
      en: "Explore what makes people choose one way of traveling over another.",
    },
  },
});
