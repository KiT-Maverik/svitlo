import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareHabitatConditionsBetweenGeographicLocations_Skill_Data = buildSkillConfig({
  slug: "compareHabitatConditionsBetweenGeographicLocations",
  id: "9b77ecf2-7ca3-404d-872d-d6802e80bf0c",
  name: {
    en: "Compare habitat conditions between geographic locations",
  },
  description: {
    methodological: "Use temperature, moisture, altitude, and land cover to explain contrasts in living conditions for organisms.",
    frontend: {
      en: "Compare conditions that create different habitats in different locations.",
    },
  },
});
