import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { budgetAndResourceConstraints_Skill_Data, choiceUnderUncertainty_Skill_Data, economicIncentives_Skill_Data } from './skills';

export const incentivesAndDecisions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "incentivesAndDecisions",
  id: "ebaaf62f-dd43-40c4-a150-fdb67e69e23d",
  name: {
    en: "Стимули та рішення",
  },
  skills: {
    budgetAndResourceConstraints: budgetAndResourceConstraints_Skill_Data,
    choiceUnderUncertainty: choiceUnderUncertainty_Skill_Data,
    economicIncentives: economicIncentives_Skill_Data,
  },
  description: {
    methodological: "Choices are influenced by benefits, costs, rules, and available information; the predictability of responses depends on context.",
    frontend: {
      en: "Discover how rewards, costs, and information affect decisions.",
    },
  },
});
