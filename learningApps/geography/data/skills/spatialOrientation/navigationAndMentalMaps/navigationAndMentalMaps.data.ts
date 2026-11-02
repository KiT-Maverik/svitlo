import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { constructARouteThroughOrderedWaypoints_Skill_Data, useCardinalDirectionsToOrientARoute_Skill_Data, useIntermediateDirectionsToDistinguishBearings_Skill_Data, useMentalMapsForSpatialOrientation_Skill_Data } from './skills';

export const navigationAndMentalMaps_SkillGroup_Data = buildSkillGroupConfig({
  slug: "navigationAndMentalMaps",
  id: "b5609f19-9ab3-4de6-bf20-0ce9ab8b5fad",
  name: {
    en: "Navigation and Mental Maps",
  },
  skills: {
    constructARouteThroughOrderedWaypoints: constructARouteThroughOrderedWaypoints_Skill_Data,
    useCardinalDirectionsToOrientARoute: useCardinalDirectionsToOrientARoute_Skill_Data,
    useIntermediateDirectionsToDistinguishBearings: useIntermediateDirectionsToDistinguishBearings_Skill_Data,
    useMentalMapsForSpatialOrientation: useMentalMapsForSpatialOrientation_Skill_Data,
  },
  description: {
    methodological: "Moving between places relies on orientation, directional instructions, and sequences of turns. The focus is spatial navigation, not the mathematical calculation of distance.",
    frontend: {
      en: "Learn to navigate using directions, landmarks and remembered spatial relationships.",
    },
  },
});
