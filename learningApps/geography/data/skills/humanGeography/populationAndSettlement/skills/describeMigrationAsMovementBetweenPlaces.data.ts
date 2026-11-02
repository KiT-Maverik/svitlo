import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const describeMigrationAsMovementBetweenPlaces_Skill_Data = buildSkillConfig({
  slug: "describeMigrationAsMovementBetweenPlaces",
  id: "b03cb24d-52a1-4d2b-88ed-63b6c1c0f8ea",
  name: {
    en: "Describe migration as movement between places",
  },
  description: {
    methodological: "Identify origin, destination, and movement direction while distinguishing a migration flow from a static population count.",
    frontend: {
      en: "Describe migration by tracing movement from an origin to a destination.",
    },
  },
});
