import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { describeClusteredAndDispersedArrangements_Skill_Data, distinguishAdjacencyFromProximity_Skill_Data, identifyBarriersAndCorridorsBetweenPlaces_Skill_Data } from './skills';

export const spatialRelationships_SkillGroup_Data = buildSkillGroupConfig({
  slug: "spatialRelationships",
  id: "1db7b4a5-aab8-4156-87ff-5af75b133eed",
  name: {
    en: "Spatial Relationships",
  },
  skills: {
    describeClusteredAndDispersedArrangements: describeClusteredAndDispersedArrangements_Skill_Data,
    distinguishAdjacencyFromProximity: distinguishAdjacencyFromProximity_Skill_Data,
    identifyBarriersAndCorridorsBetweenPlaces: identifyBarriersAndCorridorsBetweenPlaces_Skill_Data,
  },
  description: {
    methodological: "Places and features form patterns of nearness, containment, connection, concentration, and separation. These relationships matter even when the exact names of the locations change.",
    frontend: {
      en: "Recognize how places can be connected, separated or arranged in patterns.",
    },
  },
});
