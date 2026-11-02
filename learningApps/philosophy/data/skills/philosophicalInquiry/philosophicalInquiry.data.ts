import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { conceptualAnalysis_SkillGroup_Data } from './conceptualAnalysis/conceptualAnalysis.data';
import { dialogueAndDisagreement_SkillGroup_Data } from './dialogueAndDisagreement/dialogueAndDisagreement.data';
import { questionsAndProblems_SkillGroup_Data } from './questionsAndProblems/questionsAndProblems.data';

export const philosophicalInquiry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "philosophicalInquiry",
  id: "fd86f4b0-a38b-442f-aaa4-c8a193ebd520",
  name: {
    en: "Philosophical Inquiry",
  },
  groups: {
    conceptualAnalysis: conceptualAnalysis_SkillGroup_Data,
    dialogueAndDisagreement: dialogueAndDisagreement_SkillGroup_Data,
    questionsAndProblems: questionsAndProblems_SkillGroup_Data,
  },
  description: {
    methodological: "Philosophy investigates conceptual, normative, and foundational questions whose answers require reasons rather than observation alone. This domain concerns the practices used to formulate, refine, and discuss such questions; it is distinct from the formal evaluation of arguments in Logic.",
    frontend: {
      en: "Explore questions about meaning, values and assumptions through reasoned discussion.",
    },
  },
});
