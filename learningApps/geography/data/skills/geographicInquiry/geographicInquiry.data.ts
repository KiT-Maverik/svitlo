import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { decisionsAndCommunication_SkillGroup_Data } from './decisionsAndCommunication/decisionsAndCommunication.data';
import { evidenceAndInvestigation_SkillGroup_Data } from './evidenceAndInvestigation/evidenceAndInvestigation.data';

export const geographicInquiry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "geographicInquiry",
  id: "928c9bcd-2b25-4af0-8229-0e3329448c75",
  name: {
    en: "Geographic Inquiry",
  },
  groups: {
    decisionsAndCommunication: decisionsAndCommunication_SkillGroup_Data,
    evidenceAndInvestigation: evidenceAndInvestigation_SkillGroup_Data,
  },
  description: {
    methodological: "Geographic investigation turns observations about places into reasoned evidence, maps, comparisons and decisions. It includes asking spatial questions, collecting and scrutinizing data, evaluating alternatives and communicating conclusions rather than memorizing a particular set of locations.",
    frontend: {
      en: "Use geographic questions, observations and evidence to understand places and make decisions.",
    },
  },
});
