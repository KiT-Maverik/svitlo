import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { inequality_SkillGroup_Data } from './inequality/inequality.data';
import { institutionsAndDevelopment_SkillGroup_Data } from './institutionsAndDevelopment/institutionsAndDevelopment.data';
import { povertyAndWellbeing_SkillGroup_Data } from './povertyAndWellbeing/povertyAndWellbeing.data';
import { structuralChange_SkillGroup_Data } from './structuralChange/structuralChange.data';

export const developmentWellbeingAndInstitutions_SkillDomain_Data = buildSkillDomainConfig({
  slug: "developmentWellbeingAndInstitutions",
  id: "059fa85a-a9f1-4b2b-9c90-9ed6280133c5",
  name: {
    en: "Розвиток, добробут та інституції",
  },
  groups: {
    inequality: inequality_SkillGroup_Data,
    institutionsAndDevelopment: institutionsAndDevelopment_SkillGroup_Data,
    povertyAndWellbeing: povertyAndWellbeing_SkillGroup_Data,
    structuralChange: structuralChange_SkillGroup_Data,
  },
  description: {
    methodological: "Long-term differences between countries and population groups arise from productivity, distribution of resources, and rules of social interaction. Growth does not necessarily improve everyone's living conditions equally.",
    frontend: {
      en: "Explore why wealth, opportunities, and quality of life differ across societies.",
    },
  },
});
