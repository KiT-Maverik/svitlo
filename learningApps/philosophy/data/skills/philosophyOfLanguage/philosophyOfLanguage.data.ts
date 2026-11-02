import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { communicationAndInterpretation_SkillGroup_Data } from './communicationAndInterpretation/communicationAndInterpretation.data';
import { languageTruthAndPower_SkillGroup_Data } from './languageTruthAndPower/languageTruthAndPower.data';
import { meaningAndReference_SkillGroup_Data } from './meaningAndReference/meaningAndReference.data';

export const philosophyOfLanguage_SkillDomain_Data = buildSkillDomainConfig({
  slug: "philosophyOfLanguage",
  id: "0ef7acc7-3c7b-4063-aa38-12a3e8833329",
  name: {
    en: "Philosophy of Language",
  },
  groups: {
    communicationAndInterpretation: communicationAndInterpretation_SkillGroup_Data,
    languageTruthAndPower: languageTruthAndPower_SkillGroup_Data,
    meaningAndReference: meaningAndReference_SkillGroup_Data,
  },
  description: {
    methodological: "Language is examined as a system for conveying meaning, referring to the world, performing actions, and shaping interpretation. Grammar instruction and literary composition remain primarily in Language and Literature.",
    frontend: {
      en: "Explore how words convey meaning, refer to things and shape understanding.",
    },
  },
});
