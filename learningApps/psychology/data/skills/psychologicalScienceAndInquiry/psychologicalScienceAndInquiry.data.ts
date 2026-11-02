import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { evidenceAndInterpretation_SkillGroup_Data } from './evidenceAndInterpretation/evidenceAndInterpretation.data';
import { foundationsAndPerspectives_SkillGroup_Data } from './foundationsAndPerspectives/foundationsAndPerspectives.data';
import { measurementAndSampling_SkillGroup_Data } from './measurementAndSampling/measurementAndSampling.data';
import { researchEthics_SkillGroup_Data } from './researchEthics/researchEthics.data';
import { studyDesigns_SkillGroup_Data } from './studyDesigns/studyDesigns.data';

export const psychologicalScienceAndInquiry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "psychologicalScienceAndInquiry",
  id: "cd1a92f9-77e8-49a4-94c4-7435a47ddd4e",
  name: {
    en: "Psychological Science and Inquiry",
  },
  groups: {
    evidenceAndInterpretation: evidenceAndInterpretation_SkillGroup_Data,
    foundationsAndPerspectives: foundationsAndPerspectives_SkillGroup_Data,
    measurementAndSampling: measurementAndSampling_SkillGroup_Data,
    researchEthics: researchEthics_SkillGroup_Data,
    studyDesigns: studyDesigns_SkillGroup_Data,
  },
  description: {
    methodological: "Psychology explains behavior and mental processes through empirical evidence, multiple levels of analysis, and ethical inquiry. Its explanations are provisional and require stronger support than anecdote or authority.",
    frontend: {
      en: "Explore how psychologists investigate behavior and mental processes through careful research.",
    },
  },
});
