import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { recognizeHarmfulCopingPatterns_Skill_Data, recognizeSignsOfStress_Skill_Data, recognizeWarningSignsOfWorseningMentalHealth_Skill_Data } from './skills';

export const recognizingStrain_SkillGroup_Data = buildSkillGroupConfig({
  slug: "recognizingStrain",
  id: "e6e0d496-8df9-4b0b-a191-f2323bb7d394",
  name: {
    en: "Recognizing Strain",
  },
  skills: {
    recognizeHarmfulCopingPatterns: recognizeHarmfulCopingPatterns_Skill_Data,
    recognizeSignsOfStress: recognizeSignsOfStress_Skill_Data,
    recognizeWarningSignsOfWorseningMentalHealth: recognizeWarningSignsOfWorseningMentalHealth_Skill_Data,
  },
  description: {
    methodological: "Distress varies in intensity and duration; a sign can indicate a need for support without establishing a psychiatric diagnosis.",
    frontend: {
      en: "Recognize changes that may signal a need for psychological support.",
    },
  },
});
