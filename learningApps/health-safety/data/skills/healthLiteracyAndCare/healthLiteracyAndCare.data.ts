import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { healthAndRisk_SkillGroup_Data } from './healthAndRisk/healthAndRisk.data';
import { healthInformationAndMedicines_SkillGroup_Data } from './healthInformationAndMedicines/healthInformationAndMedicines.data';
import { usingHealthcare_SkillGroup_Data } from './usingHealthcare/usingHealthcare.data';

export const healthLiteracyAndCare_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'healthLiteracyAndCare',
  id: '2b02c97b-de3a-47cc-bb1e-b98e5dc031c2',
  name: {
    en: 'Health Literacy and Care',
  },
  groups: {
    healthAndRisk: healthAndRisk_SkillGroup_Data,
    healthInformationAndMedicines: healthInformationAndMedicines_SkillGroup_Data,
    usingHealthcare: usingHealthcare_SkillGroup_Data,
  },
  description: {
    methodological:
      'Personal health decisions rely on interpreting bodily changes, credible evidence, and the division of responsibility between self-care and professional services. This domain concerns informed choices and access to care rather than the biological mechanisms of disease.',
    frontend: {
      en: 'Learn to recognize health changes, use reliable information and seek appropriate care.',
    },
  },
});
