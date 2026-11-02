import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { biologicalDifferencesAndContext_SkillGroup_Data } from './biologicalDifferencesAndContext/biologicalDifferencesAndContext.data';
import { brainBehaviorRelationships_SkillGroup_Data } from './brainBehaviorRelationships/brainBehaviorRelationships.data';
import { evolutionaryAccounts_SkillGroup_Data } from './evolutionaryAccounts/evolutionaryAccounts.data';
import { neuralCommunication_SkillGroup_Data } from './neuralCommunication/neuralCommunication.data';

export const biologicalFoundationsOfBehavior_SkillDomain_Data = buildSkillDomainConfig({
  slug: "biologicalFoundationsOfBehavior",
  id: "af39e6eb-3289-4411-bd44-077f8169ecba",
  name: {
    en: "Biological Foundations of Behavior",
  },
  groups: {
    biologicalDifferencesAndContext: biologicalDifferencesAndContext_SkillGroup_Data,
    brainBehaviorRelationships: brainBehaviorRelationships_SkillGroup_Data,
    evolutionaryAccounts: evolutionaryAccounts_SkillGroup_Data,
    neuralCommunication: neuralCommunication_SkillGroup_Data,
  },
  description: {
    methodological: "Neural, endocrine, genetic, and evolved processes influence experience and action through interaction with environments. This field emphasizes explanatory mechanisms rather than rote anatomical detail or biological determinism.",
    frontend: {
      en: "Explore how brains, hormones, inherited traits and environments influence behavior.",
    },
  },
});
