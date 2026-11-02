import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { assistiveAndMedicalProducts_SkillGroup_Data } from './assistiveAndMedicalProducts/assistiveAndMedicalProducts.data';
import { medicalMeasurementDevices_SkillGroup_Data } from './medicalMeasurementDevices/medicalMeasurementDevices.data';

export const biomedicalAndAssistiveEngineering_SkillDomain_Data = buildSkillDomainConfig({
  slug: "biomedicalAndAssistiveEngineering",
  id: "47038e6b-6a25-40ad-876b-06514696de76",
  name: {
    en: "Biomedical and Assistive Engineering",
  },
  groups: {
    assistiveAndMedicalProducts: assistiveAndMedicalProducts_SkillGroup_Data,
    medicalMeasurementDevices: medicalMeasurementDevices_SkillGroup_Data,
  },
  description: {
    methodological: "Devices supporting, measuring or interacting with human bodies must satisfy suitable physical interfaces, reliability and safe-use constraints. Clinical diagnosis and the biology of the human body remain outside this engineering domain.",
    frontend: {
      en: "Explore technical products that support health, mobility and medical measurement.",
    },
  },
});
