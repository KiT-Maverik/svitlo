import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { createMaps_Skill_Data, determineMapOrientationFromItsNorthIndicator_Skill_Data, interpretAMapScaleAsADistanceRelationship_Skill_Data, interpretConventionalMapSymbolsThroughALegend_Skill_Data } from './skills';

export const mapDesignAndConventions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mapDesignAndConventions",
  id: "32a65fba-5775-4bfa-9ff6-4aab2def03c4",
  name: {
    en: "Map Design and Conventions",
  },
  skills: {
    createMaps: createMaps_Skill_Data,
    determineMapOrientationFromItsNorthIndicator: determineMapOrientationFromItsNorthIndicator_Skill_Data,
    interpretAMapScaleAsADistanceRelationship: interpretAMapScaleAsADistanceRelationship_Skill_Data,
    interpretConventionalMapSymbolsThroughALegend: interpretConventionalMapSymbolsThroughALegend_Skill_Data,
  },
  description: {
    methodological: "Creating and interpreting maps requires deliberate choices of symbols, legends, orientation, scale and labels. Conventions allow readers to infer geographic meaning from an authored representation without treating a map as a literal replica of the ground.",
    frontend: {
      en: "Learn how symbols, legends, scale and orientation make a map understandable.",
    },
  },
});
