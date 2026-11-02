import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainBroadEnvironmentalVariationWithLatitude_Skill_Data, identifyEnvironmentalShiftsFromComparativeGeographicEvidence_Skill_Data, recognizeAltitudinalChangesInNaturalConditions_Skill_Data } from './skills';

export const environmentalGradients_SkillGroup_Data = buildSkillGroupConfig({
  slug: "environmentalGradients",
  id: "de686794-a73f-4d34-9866-3f4711e4bc44",
  name: {
    en: "Environmental Gradients",
  },
  skills: {
    explainBroadEnvironmentalVariationWithLatitude: explainBroadEnvironmentalVariationWithLatitude_Skill_Data,
    identifyEnvironmentalShiftsFromComparativeGeographicEvidence: identifyEnvironmentalShiftsFromComparativeGeographicEvidence_Skill_Data,
    recognizeAltitudinalChangesInNaturalConditions: recognizeAltitudinalChangesInNaturalConditions_Skill_Data,
  },
  description: {
    methodological: "Natural conditions often vary systematically with elevation, latitude, and proximity to water. Such gradients help explain patterns without implying that every place at the same latitude is identical.",
    frontend: {
      en: "Explore how nature changes with latitude, height and proximity to water.",
    },
  },
});
