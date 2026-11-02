import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTheConceptOfWeather_Skill_Data = buildSkillConfig({
  slug: "explainTheConceptOfWeather",
  id: "85e7b560-e6d1-43c5-a131-0e5872890c2a",
  name: {
    en: "Explain the concept of weather",
  },
  description: {
    methodological: "Describe weather as the atmospheric conditions experienced at a particular place and time, including temperature, moisture, wind, cloud and precipitation. Individual observations can change rapidly and do not alone characterize a regional climate.",
    frontend: {
      en: "Understand weather as the conditions of the atmosphere at a specific moment.",
    },
  },
});
