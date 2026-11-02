import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainTheConceptOfTectonicPlateMovement_Skill_Data, identifyEarthsMainInternalLayers_Skill_Data, identifyMajorTypesOfPlateBoundaries_Skill_Data, recognizeGeographicEvidenceOfPlateMotion_Skill_Data, relatePlateInteractionsToMajorGeologicalFeatures_Skill_Data } from './skills';

export const earthsInteriorAndPlateTectonics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "earthsInteriorAndPlateTectonics",
  id: "692dec97-2393-4514-8359-c67922bfaca4",
  name: {
    en: "Earth's Interior and Plate Tectonics",
  },
  skills: {
    explainTheConceptOfTectonicPlateMovement: explainTheConceptOfTectonicPlateMovement_Skill_Data,
    identifyEarthsMainInternalLayers: identifyEarthsMainInternalLayers_Skill_Data,
    identifyMajorTypesOfPlateBoundaries: identifyMajorTypesOfPlateBoundaries_Skill_Data,
    recognizeGeographicEvidenceOfPlateMotion: recognizeGeographicEvidenceOfPlateMotion_Skill_Data,
    relatePlateInteractionsToMajorGeologicalFeatures: relatePlateInteractionsToMajorGeologicalFeatures_Skill_Data,
  },
  description: {
    methodological: "Earth has internal layers with different composition and mechanical properties, while its outer lithospheric plates move across a geologically active planet. Plate interactions explain large-scale patterns of faults, relief and geological activity, not every small local feature.",
    frontend: {
      en: "Explore Earth's internal layers and the movement of its tectonic plates.",
    },
  },
});
