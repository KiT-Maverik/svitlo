import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { evaluateHealthInformationSources_Skill_Data, recognizeMisleadingHealthClaims_Skill_Data, useMedicinesSafely_Skill_Data } from './skills';

export const healthInformationAndMedicines_SkillGroup_Data = buildSkillGroupConfig({
  slug: "healthInformationAndMedicines",
  id: "259ac15d-1522-4e57-bd61-14d0b518aae7",
  name: {
    en: "Health Information and Medicines",
  },
  skills: {
    evaluateHealthInformationSources: evaluateHealthInformationSources_Skill_Data,
    recognizeMisleadingHealthClaims: recognizeMisleadingHealthClaims_Skill_Data,
    useMedicinesSafely: useMedicinesSafely_Skill_Data,
  },
  description: {
    methodological: "Claims about prevention and treatment should be evaluated against trustworthy evidence, and medicines require label-aware, safe handling; clinical observations and basic measurements are classified in Health and Risk.",
    frontend: {
      en: "Learn to evaluate health advice and handle medicines safely.",
    },
  },
});
