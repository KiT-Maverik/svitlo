import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareHabitatConditionsBetweenGeographicLocations_Skill_Data, identifyMajorTerrestrialBiomePatterns_Skill_Data, recognizeTransitionZonesBetweenBiomes_Skill_Data } from './skills';

export const biomesAndHabitats_SkillGroup_Data = buildSkillGroupConfig({
  slug: "biomesAndHabitats",
  id: "3f57866e-626f-449f-b278-f7abcca7e431",
  name: {
    en: "Biomes and Habitats",
  },
  skills: {
    compareHabitatConditionsBetweenGeographicLocations: compareHabitatConditionsBetweenGeographicLocations_Skill_Data,
    identifyMajorTerrestrialBiomePatterns: identifyMajorTerrestrialBiomePatterns_Skill_Data,
    recognizeTransitionZonesBetweenBiomes: recognizeTransitionZonesBetweenBiomes_Skill_Data,
  },
  description: {
    methodological: "Broad vegetation and habitat patterns reflect environmental conditions while local ecosystems can be more varied than a single biome label suggests.",
    frontend: {
      en: "Discover why broad types of habitat occur in different parts of the world.",
    },
  },
});
