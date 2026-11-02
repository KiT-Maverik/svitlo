import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adultRoleTransitions_Skill_Data, cognitiveAging_Skill_Data, lifelongAdaptation_Skill_Data, socioemotionalSelectivity_Skill_Data } from './skills';

export const adulthoodAndAging_SkillGroup_Data = buildSkillGroupConfig({
  slug: "adulthoodAndAging",
  id: "66fbcd4b-3b56-4bc4-8b45-1b764f5f145c",
  name: {
    en: "Adulthood and Aging",
  },
  skills: {
    adultRoleTransitions: adultRoleTransitions_Skill_Data,
    cognitiveAging: cognitiveAging_Skill_Data,
    lifelongAdaptation: lifelongAdaptation_Skill_Data,
    socioemotionalSelectivity: socioemotionalSelectivity_Skill_Data,
  },
  description: {
    methodological: "Psychological development continues through adulthood, including shifting roles, accumulated experience, and heterogeneous cognitive trajectories.",
    frontend: {
      en: "Discover psychological changes and adaptations across adult life.",
    },
  },
});
