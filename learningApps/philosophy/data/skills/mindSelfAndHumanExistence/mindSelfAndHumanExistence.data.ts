import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { agencyAndFreeWill_SkillGroup_Data } from './agencyAndFreeWill/agencyAndFreeWill.data';
import { humanExistenceAndMeaning_SkillGroup_Data } from './humanExistenceAndMeaning/humanExistenceAndMeaning.data';
import { mindAndConsciousness_SkillGroup_Data } from './mindAndConsciousness/mindAndConsciousness.data';
import { personalIdentity_SkillGroup_Data } from './personalIdentity/personalIdentity.data';

export const mindSelfAndHumanExistence_SkillDomain_Data = buildSkillDomainConfig({
  slug: "mindSelfAndHumanExistence",
  id: "ec68429d-00ef-4c06-969e-fa19cce50f6a",
  name: {
    en: "Mind, Self, and Human Existence",
  },
  groups: {
    agencyAndFreeWill: agencyAndFreeWill_SkillGroup_Data,
    humanExistenceAndMeaning: humanExistenceAndMeaning_SkillGroup_Data,
    mindAndConsciousness: mindAndConsciousness_SkillGroup_Data,
    personalIdentity: personalIdentity_SkillGroup_Data,
  },
  description: {
    methodological: "Questions about subjective experience, the continuity of the self, deliberate action, and a meaningful human life cannot be resolved solely through psychological measurement. This domain examines theories of mind, identity, agency, and existential commitments, distinguishing them from empirical mental-health claims.",
    frontend: {
      en: "Explore philosophical questions about consciousness, personal identity, freedom and meaning.",
    },
  },
});
