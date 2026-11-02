import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const calibrateConfidenceToEvidence_Skill_Data = buildSkillConfig({
  slug: "calibrateConfidenceToEvidence",
  id: "6d8ef31a-abed-4dd6-8862-425b867cd22b",
  name: {
    en: "Calibrate confidence to evidence",
  },
  description: {
    methodological: "Express degrees of certainty proportionate to the support available and identify what new information could change them.",
    frontend: {
      en: "Adjust how certain you feel about a claim to match the available evidence.",
    },
  },
});
