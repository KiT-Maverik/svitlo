import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { geographicCoordinates_SkillGroup_Data } from './geographicCoordinates/geographicCoordinates.data';
import { geospatialTechnologies_SkillGroup_Data } from './geospatialTechnologies/geospatialTechnologies.data';
import { globesMapsAndProjection_SkillGroup_Data } from './globesMapsAndProjection/globesMapsAndProjection.data';
import { mapDesignAndConventions_SkillGroup_Data } from './mapDesignAndConventions/mapDesignAndConventions.data';
import { mapTypesAndThematicLayers_SkillGroup_Data } from './mapTypesAndThematicLayers/mapTypesAndThematicLayers.data';

export const mapsAndGeospatialRepresentations_SkillDomain_Data = buildSkillDomainConfig({
  slug: "mapsAndGeospatialRepresentations",
  id: "9c37d2cf-fae3-4c84-afb1-59c049ab5bbe",
  name: {
    en: "Maps and Geospatial Representations",
  },
  groups: {
    geographicCoordinates: geographicCoordinates_SkillGroup_Data,
    geospatialTechnologies: geospatialTechnologies_SkillGroup_Data,
    globesMapsAndProjection: globesMapsAndProjection_SkillGroup_Data,
    mapDesignAndConventions: mapDesignAndConventions_SkillGroup_Data,
    mapTypesAndThematicLayers: mapTypesAndThematicLayers_SkillGroup_Data,
  },
  description: {
    methodological: "Geographic representations convey selected positions, attributes and relationships through maps, globes, sketches, coordinates, imagery and spatial data. Competence includes interpretation and purposeful creation while acknowledging selection, measurement, projection and source limitations.",
    frontend: {
      en: "Explore how maps, globes and spatial data represent Earth's features and relationships.",
    },
  },
});
