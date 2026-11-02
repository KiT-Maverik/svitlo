import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHowFaultSlipProducesEarthquakes_Skill_Data, explainHowMagmaReachesEarthsSurface_Skill_Data, interpretEarthquakeDistributionsOnAMap_Skill_Data, interpretGeographicExposureToGeologicalHazards_Skill_Data, recognizeLandformsCreatedByVolcanicActivity_Skill_Data } from './skills';

export const earthquakesAndVolcanism_SkillGroup_Data = buildSkillGroupConfig({
  slug: "earthquakesAndVolcanism",
  id: "5afabf1f-c809-4fbd-9916-25eb5ed14e76",
  name: {
    en: "Earthquakes and Volcanism",
  },
  skills: {
    explainHowFaultSlipProducesEarthquakes: explainHowFaultSlipProducesEarthquakes_Skill_Data,
    explainHowMagmaReachesEarthsSurface: explainHowMagmaReachesEarthsSurface_Skill_Data,
    interpretEarthquakeDistributionsOnAMap: interpretEarthquakeDistributionsOnAMap_Skill_Data,
    interpretGeographicExposureToGeologicalHazards: interpretGeographicExposureToGeologicalHazards_Skill_Data,
    recognizeLandformsCreatedByVolcanicActivity: recognizeLandformsCreatedByVolcanicActivity_Skill_Data,
  },
  description: {
    methodological: "Sudden slip on faults and the movement of magma produce recognizable geological events with uneven spatial occurrence. This group addresses causes, observable landforms and spatial exposure; it does not prescribe individual emergency procedures or detailed physical equations.",
    frontend: {
      en: "Discover how earthquakes and volcanic activity shape different regions.",
    },
  },
});
