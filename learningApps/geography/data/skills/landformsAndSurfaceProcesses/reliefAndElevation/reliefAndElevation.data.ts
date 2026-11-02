import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { interpretContourSpacingAsTerrainSteepness_Skill_Data, interpretElevationRelativeToAVerticalReference_Skill_Data, interpretRelativeReliefBetweenLocations_Skill_Data } from './skills';

export const reliefAndElevation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "reliefAndElevation",
  id: "bdb0a0da-9e24-4623-96eb-df220b8f12c6",
  name: {
    en: "Relief and Elevation",
  },
  skills: {
    interpretContourSpacingAsTerrainSteepness: interpretContourSpacingAsTerrainSteepness_Skill_Data,
    interpretElevationRelativeToAVerticalReference: interpretElevationRelativeToAVerticalReference_Skill_Data,
    interpretRelativeReliefBetweenLocations: interpretRelativeReliefBetweenLocations_Skill_Data,
  },
  description: {
    methodological: "The shape and vertical variation of terrain distinguish plains, hills, mountains, valleys and plateaus. Understanding elevation and relief also supports interpretation of slopes and contour information; foundational identification of landform categories belongs to Geographic Objects.",
    frontend: {
      en: "Learn how elevation, terrain and slopes are described and interpreted.",
    },
  },
});
