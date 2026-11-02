import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAWordFromItsReferent_Skill_Data, distinguishSenseFromReference_Skill_Data, identifySemanticAmbiguity_Skill_Data } from './skills';

export const meaningAndReference_SkillGroup_Data = buildSkillGroupConfig({
  slug: "meaningAndReference",
  id: "5610de14-650b-49f6-bc2b-c9cca3484514",
  name: {
    en: "Meaning and Reference",
  },
  skills: {
    distinguishAWordFromItsReferent: distinguishAWordFromItsReferent_Skill_Data,
    distinguishSenseFromReference: distinguishSenseFromReference_Skill_Data,
    identifySemanticAmbiguity: identifySemanticAmbiguity_Skill_Data,
  },
  description: {
    methodological: "Words and sentences can express meanings beyond identifying objects; context, concepts, and the distinction between expression and referent affect analysis.",
    frontend: {
      en: "Discover the difference between a word, its meaning and what it refers to.",
    },
  },
});
