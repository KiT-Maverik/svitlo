import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeGeographicRelationshipsUsingSpatialDataLayers_Skill_Data, interpretRemoteSensingImagery_Skill_Data, useSatellitePositioningInformationForGeographicOrientation_Skill_Data } from './skills';

export const geospatialTechnologies_SkillGroup_Data = buildSkillGroupConfig({
  slug: "geospatialTechnologies",
  id: "fa687826-95fb-4580-92b6-d4308b2521ab",
  name: {
    en: "Geospatial Technologies",
  },
  skills: {
    analyzeGeographicRelationshipsUsingSpatialDataLayers: analyzeGeographicRelationshipsUsingSpatialDataLayers_Skill_Data,
    interpretRemoteSensingImagery: interpretRemoteSensingImagery_Skill_Data,
    useSatellitePositioningInformationForGeographicOrientation: useSatellitePositioningInformationForGeographicOrientation_Skill_Data,
  },
  description: {
    methodological: "Satellite and aerial imagery, positioning systems and geographic information systems provide different kinds of geographically referenced evidence. The focus is interpreting and using that evidence for geographic questions, not programming a software package or memorizing individual interface controls.",
    frontend: {
      en: "Explore how satellite images, positioning systems and spatial layers provide evidence.",
    },
  },
});
