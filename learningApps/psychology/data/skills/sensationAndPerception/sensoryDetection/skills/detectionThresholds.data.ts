import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectionThresholds_Skill_Data = buildSkillConfig({
  slug: "detectionThresholds",
  id: "319512be-6e2b-4fda-b96d-6a1bdc951f0c",
  name: {
    en: "Detection Thresholds",
  },
  description: {
    methodological: "Explain how signal strength and competing noise affect the likelihood of noticing a stimulus.",
    frontend: {
      en: "Explain why stronger signals may be easier to notice amid noise.",
    },
  },
});
