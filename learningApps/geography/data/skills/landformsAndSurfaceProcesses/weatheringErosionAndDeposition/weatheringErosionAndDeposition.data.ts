import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainDepositionOfTransportedSediment_Skill_Data, explainHowErosionTransportsSurfaceMaterial_Skill_Data, explainTheFormationOfFluvialLandforms_Skill_Data, explainWeatheringOfExposedRock_Skill_Data } from './skills';

export const weatheringErosionAndDeposition_SkillGroup_Data = buildSkillGroupConfig({
  slug: "weatheringErosionAndDeposition",
  id: "3836be4c-7168-4b49-873b-65ed206453b7",
  name: {
    en: "Weathering, Erosion, and Deposition",
  },
  skills: {
    explainDepositionOfTransportedSediment: explainDepositionOfTransportedSediment_Skill_Data,
    explainHowErosionTransportsSurfaceMaterial: explainHowErosionTransportsSurfaceMaterial_Skill_Data,
    explainTheFormationOfFluvialLandforms: explainTheFormationOfFluvialLandforms_Skill_Data,
    explainWeatheringOfExposedRock: explainWeatheringOfExposedRock_Skill_Data,
  },
  description: {
    methodological: "Rocks and sediment change on the exposed surface as material breaks down in place, is carried by water, wind, ice or gravity, and comes to rest elsewhere. These processes can alter valleys, coasts and plains without being confused with deep tectonic deformation.",
    frontend: {
      en: "Discover how rocks break down, material moves and sediment accumulates.",
    },
  },
});
