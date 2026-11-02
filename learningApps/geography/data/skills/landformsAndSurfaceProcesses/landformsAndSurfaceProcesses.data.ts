import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { reliefAndElevation_SkillGroup_Data } from './reliefAndElevation/reliefAndElevation.data';
import { soilsAndSurfaceSediments_SkillGroup_Data } from './soilsAndSurfaceSediments/soilsAndSurfaceSediments.data';
import { weatheringErosionAndDeposition_SkillGroup_Data } from './weatheringErosionAndDeposition/weatheringErosionAndDeposition.data';

export const landformsAndSurfaceProcesses_SkillDomain_Data = buildSkillDomainConfig({
  slug: "landformsAndSurfaceProcesses",
  id: "867dae3c-d00e-485c-8c37-304978460de1",
  name: {
    en: "Landforms and Surface Processes",
  },
  groups: {
    reliefAndElevation: reliefAndElevation_SkillGroup_Data,
    soilsAndSurfaceSediments: soilsAndSurfaceSediments_SkillGroup_Data,
    weatheringErosionAndDeposition: weatheringErosionAndDeposition_SkillGroup_Data,
  },
  description: {
    methodological: "Relief and unconsolidated surface materials form landscapes that change through weathering, transportation and deposition. This domain examines the recognizable forms and near-surface changes of terrain rather than the internal structure, mineralogy or deep-time evolution of solid Earth.",
    frontend: {
      en: "Explore the shapes of landscapes and how surface materials move and change.",
    },
  },
});
