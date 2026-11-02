import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeTheScopeOfAQuantifier_Skill_Data, distinguishPredicatesFromPropositions_Skill_Data, evaluateAnInferenceWithQuantifiers_Skill_Data, interpretExistentialQuantification_Skill_Data, interpretUniversalQuantification_Skill_Data, negateAQuantifiedProposition_Skill_Data } from './skills';

export const predicateLogic_SkillGroup_Data = buildSkillGroupConfig({
  slug: "predicateLogic",
  id: "4f6a7013-0bd1-4923-8061-987248079eb3",
  name: {
    en: "Predicate Logic",
  },
  skills: {
    analyzeTheScopeOfAQuantifier: analyzeTheScopeOfAQuantifier_Skill_Data,
    distinguishPredicatesFromPropositions: distinguishPredicatesFromPropositions_Skill_Data,
    evaluateAnInferenceWithQuantifiers: evaluateAnInferenceWithQuantifiers_Skill_Data,
    interpretExistentialQuantification: interpretExistentialQuantification_Skill_Data,
    interpretUniversalQuantification: interpretUniversalQuantification_Skill_Data,
    negateAQuantifiedProposition: negateAQuantifiedProposition_Skill_Data,
  },
  description: {
    methodological: "Variables and quantifiers permit reasoning about individuals and collections. The relevant universe and scope of each quantifier must be made explicit to evaluate meaning and inference.",
    frontend: {
      en: "Explore how quantifiers express claims about all or some members of a group.",
    },
  },
});
