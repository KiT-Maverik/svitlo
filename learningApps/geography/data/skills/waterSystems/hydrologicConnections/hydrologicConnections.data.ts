import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareGeographicWaterAvailabilityAcrossRegions_Skill_Data, explainInfiltrationAndGroundwaterRecharge_Skill_Data, explainSurfaceRunoffAsAWaterPathway_Skill_Data, explainTheHydrologicCycle_Skill_Data } from './skills';

export const hydrologicConnections_SkillGroup_Data = buildSkillGroupConfig({
  slug: "hydrologicConnections",
  id: "b9a75b6d-93fb-4b7b-a8e7-76566745ed52",
  name: {
    en: "Hydrologic Connections",
  },
  skills: {
    compareGeographicWaterAvailabilityAcrossRegions: compareGeographicWaterAvailabilityAcrossRegions_Skill_Data,
    explainInfiltrationAndGroundwaterRecharge: explainInfiltrationAndGroundwaterRecharge_Skill_Data,
    explainSurfaceRunoffAsAWaterPathway: explainSurfaceRunoffAsAWaterPathway_Skill_Data,
    explainTheHydrologicCycle: explainTheHydrologicCycle_Skill_Data,
  },
  description: {
    methodological: "Water changes location and state among the atmosphere, surface, living systems, and subsurface. This is a connected circulation model rather than a single linear loop.",
    frontend: {
      en: "See how water circulates between air, land, organisms and underground stores.",
    },
  },
});
