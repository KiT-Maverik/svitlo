import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHowGlaciersFormAndMove_Skill_Data, explainHowGlaciersReshapeTerrain_Skill_Data, explainTheConceptOfAGroundwaterAquifer_Skill_Data, interpretGeographicVariationsInFreshwaterStorage_Skill_Data } from './skills';

export const frozenAndSubsurfaceWater_SkillGroup_Data = buildSkillGroupConfig({
  slug: "frozenAndSubsurfaceWater",
  id: "6871971a-527c-42da-acf6-20c7534ec4e6",
  name: {
    en: "Frozen and Subsurface Water",
  },
  skills: {
    explainHowGlaciersFormAndMove: explainHowGlaciersFormAndMove_Skill_Data,
    explainHowGlaciersReshapeTerrain: explainHowGlaciersReshapeTerrain_Skill_Data,
    explainTheConceptOfAGroundwaterAquifer: explainTheConceptOfAGroundwaterAquifer_Skill_Data,
    interpretGeographicVariationsInFreshwaterStorage: interpretGeographicVariationsInFreshwaterStorage_Skill_Data,
  },
  description: {
    methodological: "Snow, ice and groundwater store freshwater for different durations and interact with landscapes and human supplies. Their accumulation and discharge vary with climate, geology and geography rather than being visible only in rivers.",
    frontend: {
      en: "Discover how snow, ice and underground water store fresh water.",
    },
  },
});
