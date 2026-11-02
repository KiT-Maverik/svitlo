import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const locateAPointFromALatitudeLongitudePair_Skill_Data = buildSkillConfig({
  slug: "locateAPointFromALatitudeLongitudePair",
  id: "c9053fd9-cf5d-4dd1-82bb-0e256469c892",
  name: {
    en: "Locate a point from a latitude–longitude pair",
  },
  description: {
    methodological: "Use both coordinates in their proper order and hemispheres to identify a geographic position.",
    frontend: {
      en: "Find a location from a correctly ordered latitude–longitude pair.",
    },
  },
});
