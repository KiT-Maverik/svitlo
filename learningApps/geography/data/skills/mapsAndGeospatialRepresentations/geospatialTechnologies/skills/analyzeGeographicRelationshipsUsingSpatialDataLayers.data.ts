import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const analyzeGeographicRelationshipsUsingSpatialDataLayers_Skill_Data = buildSkillConfig({
  slug: "analyzeGeographicRelationshipsUsingSpatialDataLayers",
  id: "44c8f87f-e148-446f-bf90-29775f1c042c",
  name: {
    en: "Analyze geographic relationships using spatial data layers",
  },
  description: {
    methodological: "Combine separately mapped geographic properties to investigate co-occurrence, proximity or spatial variation, taking account of registration, resolution and the risk of mistaking correlation for causation. GIS is a possible tool rather than the definition of the Skill.",
    frontend: {
      en: "Combine spatial data layers to study patterns without assuming correlation proves causation.",
    },
  },
});
