import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessLimitationsOfGeographicDataSources_Skill_Data = buildSkillConfig({
  slug: "assessLimitationsOfGeographicDataSources",
  id: "c6769bab-2816-494b-889c-1349e8f03183",
  name: {
    en: "Assess limitations of geographic data sources",
  },
  description: {
    methodological: "Check coverage, age, resolution, classification, and possible bias before drawing conclusions from a map or dataset.",
    frontend: {
      en: "Recognize when a map or geographic dataset is incomplete, outdated or biased.",
    },
  },
});
