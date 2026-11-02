import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyUnconsolidatedSedimentByGrainSize_Skill_Data, explainHowASoilProfileDevelopsAtTheSurface_Skill_Data, explainInfiltrationDifferencesAmongSurfaceMaterials_Skill_Data, inferBasicLandUseConstraintsFromSoilConditions_Skill_Data } from './skills';

export const soilsAndSurfaceSediments_SkillGroup_Data = buildSkillGroupConfig({
  slug: "soilsAndSurfaceSediments",
  id: "95e86302-23ea-4f79-874c-682c2d9793f7",
  name: {
    en: "Soils and Surface Sediments",
  },
  skills: {
    classifyUnconsolidatedSedimentByGrainSize: classifyUnconsolidatedSedimentByGrainSize_Skill_Data,
    explainHowASoilProfileDevelopsAtTheSurface: explainHowASoilProfileDevelopsAtTheSurface_Skill_Data,
    explainInfiltrationDifferencesAmongSurfaceMaterials: explainInfiltrationDifferencesAmongSurfaceMaterials_Skill_Data,
    inferBasicLandUseConstraintsFromSoilConditions: inferBasicLandUseConstraintsFromSoilConditions_Skill_Data,
  },
  description: {
    methodological: "Soil develops through alteration of parent material and accumulation of organic matter, while loose sediments vary in grain size and drainage. Their location and physical conditions influence water movement, vegetation and practical land use.",
    frontend: {
      en: "Discover how soils and loose sediments form and affect land use.",
    },
  },
});
