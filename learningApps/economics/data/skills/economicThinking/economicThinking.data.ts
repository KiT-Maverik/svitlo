import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { exchangeAndInstitutions_SkillGroup_Data } from './exchangeAndInstitutions/exchangeAndInstitutions.data';
import { incentivesAndDecisions_SkillGroup_Data } from './incentivesAndDecisions/incentivesAndDecisions.data';
import { scarcityAndChoice_SkillGroup_Data } from './scarcityAndChoice/scarcityAndChoice.data';
import { strategicInteraction_SkillGroup_Data } from './strategicInteraction/strategicInteraction.data';

export const economicThinking_SkillDomain_Data = buildSkillDomainConfig({
  slug: "economicThinking",
  id: "a9f4fa52-add3-4088-96ce-21ec720ef4ae",
  name: {
    en: "Економічне мислення",
  },
  groups: {
    exchangeAndInstitutions: exchangeAndInstitutions_SkillGroup_Data,
    incentivesAndDecisions: incentivesAndDecisions_SkillGroup_Data,
    scarcityAndChoice: scarcityAndChoice_SkillGroup_Data,
    strategicInteraction: strategicInteraction_SkillGroup_Data,
  },
  description: {
    methodological: "Economic analysis examines how people and organizations choose among alternatives when resources are limited, respond to incentives, and coordinate decisions. It provides the conceptual foundation for other economic domains rather than a collection of everyday exercises.",
    frontend: {
      en: "Understand how people make choices, respond to incentives, and share limited resources.",
    },
  },
});
