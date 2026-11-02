import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeAreasExposedToWeatherRelatedHazards_Skill_Data = buildSkillConfig({
  slug: "recognizeAreasExposedToWeatherRelatedHazards",
  id: "cdfba8b1-d220-44b5-a14a-738ee3a6694f",
  name: {
    en: "Recognize areas exposed to weather-related hazards",
  },
  description: {
    methodological: "Match a described event such as a flood-producing storm or drought with plausible geographic exposure conditions.",
    frontend: {
      en: "Recognize locations more exposed to floods, droughts, storms or extreme heat.",
    },
  },
});
