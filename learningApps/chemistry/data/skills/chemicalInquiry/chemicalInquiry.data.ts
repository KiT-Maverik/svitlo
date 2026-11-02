import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { analyticalChemistry_SkillGroup_Data } from './analyticalChemistry/analyticalChemistry.data';
import { laboratoryReasoning_SkillGroup_Data } from './laboratoryReasoning/laboratoryReasoning.data';
import { measurementsAndEvidence_SkillGroup_Data } from './measurementsAndEvidence/measurementsAndEvidence.data';
import { questionsAndModels_SkillGroup_Data } from './questionsAndModels/questionsAndModels.data';

export const chemicalInquiry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "chemicalInquiry",
  id: "f8ccde78-00a5-4247-a7c2-28021b0b40a4",
  name: {
    en: "Chemical Inquiry",
  },
  groups: {
    analyticalChemistry: analyticalChemistry_SkillGroup_Data,
    laboratoryReasoning: laboratoryReasoning_SkillGroup_Data,
    measurementsAndEvidence: measurementsAndEvidence_SkillGroup_Data,
    questionsAndModels: questionsAndModels_SkillGroup_Data,
  },
  description: {
    methodological: "Chemical knowledge connects observations of substances with explanations, testable models and reliable evidence. This domain covers chemistry-specific investigation and communication; general research methodology remains a cross-disciplinary concern.",
    frontend: {
      en: "Explore how chemists investigate substances, test explanations and use trustworthy evidence.",
    },
  },
});
