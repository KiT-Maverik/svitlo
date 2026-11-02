import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const calibrationCurves_Skill_Data = buildSkillConfig({
  slug: "calibrationCurves",
  id: "7ea3082d-a96d-488b-b1b3-df3fdc9cba84",
  name: {
    en: "Calibration Curves",
  },
  description: {
    methodological: "Relate an instrument signal to known standards while recognizing background response, limited range and uncertainty.",
    frontend: {
      en: "Read a calibration curve to connect instrument signals with known concentrations.",
    },
  },
});
