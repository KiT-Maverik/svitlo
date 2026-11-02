import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const constructARouteThroughOrderedWaypoints_Skill_Data = buildSkillConfig({
  slug: "constructARouteThroughOrderedWaypoints",
  id: "3143ffd4-848b-4c17-8cfa-6d2d368af2ba",
  name: {
    en: "Construct a route through ordered waypoints",
  },
  description: {
    methodological: "Choose an intelligible sequence of landmarks and turns between two positions, checking that the instructions preserve connectivity.",
    frontend: {
      en: "Plan connected routes using landmarks and turns in the correct order.",
    },
  },
});
