import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { evidenceAndTestimony_SkillGroup_Data } from './evidenceAndTestimony/evidenceAndTestimony.data';
import { knowledgeAndJustification_SkillGroup_Data } from './knowledgeAndJustification/knowledgeAndJustification.data';
import { mediaAndPublicInformation_SkillGroup_Data } from './mediaAndPublicInformation/mediaAndPublicInformation.data';
import { uncertaintyAndSkepticism_SkillGroup_Data } from './uncertaintyAndSkepticism/uncertaintyAndSkepticism.data';

export const epistemologyAndCriticalEvaluation_SkillDomain_Data = buildSkillDomainConfig({
  slug: "epistemologyAndCriticalEvaluation",
  id: "b9b076ca-f5fc-47ed-ac06-d5a516f3176e",
  name: {
    en: "Epistemology and Critical Evaluation",
  },
  groups: {
    evidenceAndTestimony: evidenceAndTestimony_SkillGroup_Data,
    knowledgeAndJustification: knowledgeAndJustification_SkillGroup_Data,
    mediaAndPublicInformation: mediaAndPublicInformation_SkillGroup_Data,
    uncertaintyAndSkepticism: uncertaintyAndSkepticism_SkillGroup_Data,
  },
  description: {
    methodological: "Questions about knowledge concern what can be believed responsibly, what makes claims true, and when confidence should change. This domain applies general standards of justification to testimony and public information; scientific experimental design has its own domain.",
    frontend: {
      en: "Explore what makes a belief justified and how to evaluate public information.",
    },
  },
});
