import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeMoralDuty_Skill_Data, distinguishIntentionsFromConsequences_Skill_Data, distinguishMoralFromNonMoralJudgments_Skill_Data, distinguishMoralResponsibilityFromCausalResponsibility_Skill_Data } from './skills';

export const moralConcepts_SkillGroup_Data = buildSkillGroupConfig({
  slug: "moralConcepts",
  id: "6bf2d423-cf14-43e1-b2bc-269c1c561a6f",
  name: {
    en: "Moral Concepts",
  },
  skills: {
    analyzeMoralDuty: analyzeMoralDuty_Skill_Data,
    distinguishIntentionsFromConsequences: distinguishIntentionsFromConsequences_Skill_Data,
    distinguishMoralFromNonMoralJudgments: distinguishMoralFromNonMoralJudgments_Skill_Data,
    distinguishMoralResponsibilityFromCausalResponsibility: distinguishMoralResponsibilityFromCausalResponsibility_Skill_Data,
  },
  description: {
    methodological: "Ethical claims use concepts such as duty, harm, intention, and virtue that cannot be reduced to personal approval.",
    frontend: {
      en: "Learn to recognize concepts such as duty, intention, harm and moral responsibility.",
    },
  },
});
