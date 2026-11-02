import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareGeographicWaterAvailabilityAcrossRegions_Skill_Data = buildSkillConfig({
  slug: "compareGeographicWaterAvailabilityAcrossRegions",
  id: "01e72fb2-d2c9-413e-ab2f-5ecdaa9125d8",
  name: {
    en: "Compare geographic water availability across regions",
  },
  description: {
    methodological: "Relate precipitation, storage, seasonal variation, and demand to differences in accessible fresh water, rather than equating wet weather with secure supply.",
    frontend: {
      en: "Compare the availability of fresh water in different regions.",
    },
  },
});
