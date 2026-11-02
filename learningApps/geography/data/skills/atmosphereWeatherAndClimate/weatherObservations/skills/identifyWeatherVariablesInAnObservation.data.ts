import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyWeatherVariablesInAnObservation_Skill_Data = buildSkillConfig({
  slug: "identifyWeatherVariablesInAnObservation",
  id: "69c05315-3fe9-426b-bc31-8b104dc59cb9",
  name: {
    en: "Identify weather variables in an observation",
  },
  description: {
    methodological: "Separate air temperature, precipitation, wind, cloud cover, and pressure as different properties rather than a single “good or bad weather” rating.",
    frontend: {
      en: "Distinguish temperature, rain, wind, clouds and pressure as weather variables.",
    },
  },
});
