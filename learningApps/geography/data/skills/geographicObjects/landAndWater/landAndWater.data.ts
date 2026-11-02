import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyCoastalLandformsAndPassages_Skill_Data, classifyCommonLandformsByObservableCharacteristics_Skill_Data, distinguishLakesRiversAndWetlandsByWaterBehavior_Skill_Data, distinguishOceanSeaGulfAndBayInGeographicContext_Skill_Data } from './skills';

export const landAndWater_SkillGroup_Data = buildSkillGroupConfig({
  slug: "landAndWater",
  id: "b296f364-8d09-4c52-b906-7e4d21ca36d7",
  name: {
    en: "Land and Water",
  },
  skills: {
    classifyCoastalLandformsAndPassages: classifyCoastalLandformsAndPassages_Skill_Data,
    classifyCommonLandformsByObservableCharacteristics: classifyCommonLandformsByObservableCharacteristics_Skill_Data,
    distinguishLakesRiversAndWetlandsByWaterBehavior: distinguishLakesRiversAndWetlandsByWaterBehavior_Skill_Data,
    distinguishOceanSeaGulfAndBayInGeographicContext: distinguishOceanSeaGulfAndBayInGeographicContext_Skill_Data,
  },
  description: {
    methodological: "Natural geographic features are differentiated by relief, water movement, enclosure and spatial relationships to neighboring land or water. Object identification is separate from the physical processes that formed a coastline, mountain or river valley.",
    frontend: {
      en: "Learn to distinguish common natural land and water features.",
    },
  },
});
