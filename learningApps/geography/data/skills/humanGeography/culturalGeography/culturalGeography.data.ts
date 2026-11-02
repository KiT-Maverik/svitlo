import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareCulturalLandscapesAcrossPlaces_Skill_Data, explainGeographicDiffusionOfCulturalPractices_Skill_Data, interpretTheGeographicDistributionOfCulturalCharacteristics_Skill_Data, recognizeHumanInfluencesOnACulturalLandscape_Skill_Data } from './skills';

export const culturalGeography_SkillGroup_Data = buildSkillGroupConfig({
  slug: "culturalGeography",
  id: "0c32e711-1217-4b60-9fba-feb0158b0a02",
  name: {
    en: "Cultural Geography",
  },
  skills: {
    compareCulturalLandscapesAcrossPlaces: compareCulturalLandscapesAcrossPlaces_Skill_Data,
    explainGeographicDiffusionOfCulturalPractices: explainGeographicDiffusionOfCulturalPractices_Skill_Data,
    interpretTheGeographicDistributionOfCulturalCharacteristics: interpretTheGeographicDistributionOfCulturalCharacteristics_Skill_Data,
    recognizeHumanInfluencesOnACulturalLandscape: recognizeHumanInfluencesOnACulturalLandscape_Skill_Data,
  },
  description: {
    methodological: "Languages, practices, built environments and cultural identities form geographic distributions that evolve through human movement and interaction. Geographic interpretation describes spatial patterns and diffusion without assigning one culture to all inhabitants of a territory.",
    frontend: {
      en: "Discover how cultural practices, languages and landscapes vary across places.",
    },
  },
});
