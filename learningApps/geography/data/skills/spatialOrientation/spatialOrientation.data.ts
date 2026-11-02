import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { locationAndReference_SkillGroup_Data } from './locationAndReference/locationAndReference.data';
import { navigationAndMentalMaps_SkillGroup_Data } from './navigationAndMentalMaps/navigationAndMentalMaps.data';
import { spatialRelationships_SkillGroup_Data } from './spatialRelationships/spatialRelationships.data';
import { timeZones_SkillGroup_Data } from './timeZones/timeZones.data';

export const spatialOrientation_SkillDomain_Data = buildSkillDomainConfig({
  slug: "spatialOrientation",
  id: "33495e13-e6fd-4c3a-a62e-b12684df6dea",
  name: {
    en: "Spatial Orientation",
  },
  groups: {
    locationAndReference: locationAndReference_SkillGroup_Data,
    navigationAndMentalMaps: navigationAndMentalMaps_SkillGroup_Data,
    spatialRelationships: spatialRelationships_SkillGroup_Data,
    timeZones: timeZones_SkillGroup_Data,
  },
  description: {
    methodological: "Locating and orienting oneself requires a stable or relative reference, directions, remembered spatial relationships and awareness of changing spatial and temporal frames. These competencies concern where places are, how we navigate between them, and how their civil and solar times relate—not how maps are drawn.",
    frontend: {
      en: "Discover how locations, directions, routes and time differences help us orient ourselves.",
    },
  },
});
