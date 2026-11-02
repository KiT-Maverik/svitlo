import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { preventColdExposureInjury_Skill_Data, preventHeatRelatedIllness_Skill_Data, protectAgainstHarmfulUVExposure_Skill_Data, safeNavigationInUnfamiliarTerrain_Skill_Data, thunderstormSafety_Skill_Data, wildlifeAndPlantSafety_Skill_Data } from './skills';

export const weatherAndNatureHazards_SkillGroup_Data = buildSkillGroupConfig({
  slug: "weatherAndNatureHazards",
  id: "bd3105bb-91ea-4c43-bcdc-ceecdd9f8956",
  name: {
    en: "Weather and Nature Hazards",
  },
  skills: {
    preventColdExposureInjury: preventColdExposureInjury_Skill_Data,
    preventHeatRelatedIllness: preventHeatRelatedIllness_Skill_Data,
    protectAgainstHarmfulUVExposure: protectAgainstHarmfulUVExposure_Skill_Data,
    safeNavigationInUnfamiliarTerrain: safeNavigationInUnfamiliarTerrain_Skill_Data,
    thunderstormSafety: thunderstormSafety_Skill_Data,
    wildlifeAndPlantSafety: wildlifeAndPlantSafety_Skill_Data,
  },
  description: {
    methodological: "Outdoor risks vary with temperature, sunlight, storms, terrain, and wildlife; adaptation depends on current conditions and local alerts.",
    frontend: {
      en: "Recognize how changing weather and terrain affect outdoor safety.",
    },
  },
});
