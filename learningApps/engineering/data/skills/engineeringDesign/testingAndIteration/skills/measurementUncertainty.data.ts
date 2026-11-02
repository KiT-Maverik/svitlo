import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const measurementUncertainty_Skill_Data = buildSkillConfig({
  slug: "measurementUncertainty",
  id: "5e1d05c9-0b33-4d61-a204-cfd31edadf3a",
  name: {
    en: "Measurement uncertainty",
  },
  description: {
    methodological: "Characterize the limits of numerical observations using resolution, calibration, repeatability and error sources, including consequences for a pass-or-fail engineering decision.",
    frontend: {
      en: "Understand how measurement uncertainty can affect an engineering decision.",
    },
  },
});
