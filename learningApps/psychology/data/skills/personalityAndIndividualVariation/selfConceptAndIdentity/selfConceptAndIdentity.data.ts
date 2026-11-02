import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identityAndSocialContext_Skill_Data, selfConcept_Skill_Data, selfEsteem_Skill_Data, selfServingAttributions_Skill_Data } from './skills';

export const selfConceptAndIdentity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "selfConceptAndIdentity",
  id: "b0f4bdbf-73f4-4656-a20a-2f746460d558",
  name: {
    en: "Self-Concept and Identity",
  },
  skills: {
    identityAndSocialContext: identityAndSocialContext_Skill_Data,
    selfConcept: selfConcept_Skill_Data,
    selfEsteem: selfEsteem_Skill_Data,
    selfServingAttributions: selfServingAttributions_Skill_Data,
  },
  description: {
    methodological: "Accounts people hold about themselves are shaped through experience and relationships and may not match external observations.",
    frontend: {
      en: "Discover how people's beliefs about themselves develop and change.",
    },
  },
});
