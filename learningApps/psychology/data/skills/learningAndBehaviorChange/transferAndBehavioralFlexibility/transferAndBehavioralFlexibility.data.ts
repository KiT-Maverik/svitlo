import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { contextDependentLearning_Skill_Data, feedbackAndSkillAcquisition_Skill_Data, learnedHelplessness_Skill_Data, transferOfLearning_Skill_Data } from './skills';

export const transferAndBehavioralFlexibility_SkillGroup_Data = buildSkillGroupConfig({
  slug: "transferAndBehavioralFlexibility",
  id: "11e3889c-8d6e-48ce-bd2c-51ce1227c839",
  name: {
    en: "Transfer and Behavioral Flexibility",
  },
  skills: {
    contextDependentLearning: contextDependentLearning_Skill_Data,
    feedbackAndSkillAcquisition: feedbackAndSkillAcquisition_Skill_Data,
    learnedHelplessness: learnedHelplessness_Skill_Data,
    transferOfLearning: transferOfLearning_Skill_Data,
  },
  description: {
    methodological: "Acquired responses must generalize appropriately across contexts while remaining sensitive to meaningful differences.",
    frontend: {
      en: "Learn why practiced skills do not always transfer automatically to new situations.",
    },
  },
});
