import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const biomedicalMeasurementReliability_Skill_Data = buildSkillConfig({
  slug: "biomedicalMeasurementReliability",
  id: "84ac7e47-def9-48e3-9a81-461151f40412",
  name: {
    en: "Biomedical measurement reliability",
  },
  description: {
    methodological: "Assess calibration, interference, patient-contact conditions and signal reliability limits relevant to measurements by a medical device.",
    frontend: {
      en: "Recognize the limits and uncertainty of biomedical measurements.",
    },
  },
});
