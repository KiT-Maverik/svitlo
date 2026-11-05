import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { preventionAndAccessToHelp_SkillGroup_Data } from './preventionAndAccessToHelp/preventionAndAccessToHelp.data';
import { substanceRelatedRisks_SkillGroup_Data } from './substanceRelatedRisks/substanceRelatedRisks.data';

export const substanceUseAndDependencePrevention_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'substanceUseAndDependencePrevention',
  id: '97980369-7459-4e14-b975-7a56bdc6e208',
  name: {
    en: 'Substance Use and Dependence Prevention',
  },
  groups: {
    preventionAndAccessToHelp: preventionAndAccessToHelp_SkillGroup_Data,
    substanceRelatedRisks: substanceRelatedRisks_SkillGroup_Data,
  },
  description: {
    methodological:
      'Tobacco, alcohol, drugs, and other dependence-forming patterns can affect health and safety. The focus is recognizing hazards, resisting coercion, and seeking care rather than pharmacological synthesis or moral judgment.',
    frontend: {
      en: 'Recognize harms linked to substances or dependence and know where to seek help.',
    },
  },
});
