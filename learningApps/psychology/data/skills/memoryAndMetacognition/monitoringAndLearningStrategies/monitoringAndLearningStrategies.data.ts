import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { illusionsOfLearning_Skill_Data, interleavedPractice_Skill_Data, retrievalPractice_Skill_Data, selfTestingAndCalibration_Skill_Data, strategySelectionForLearning_Skill_Data } from './skills';

export const monitoringAndLearningStrategies_SkillGroup_Data = buildSkillGroupConfig({
  slug: "monitoringAndLearningStrategies",
  id: "65dfe854-60d7-4fda-a6b4-eaa44425fe68",
  name: {
    en: "Monitoring and Learning Strategies",
  },
  skills: {
    illusionsOfLearning: illusionsOfLearning_Skill_Data,
    interleavedPractice: interleavedPractice_Skill_Data,
    retrievalPractice: retrievalPractice_Skill_Data,
    selfTestingAndCalibration: selfTestingAndCalibration_Skill_Data,
    strategySelectionForLearning: strategySelectionForLearning_Skill_Data,
  },
  description: {
    methodological: "Monitoring performance and choosing strategies require evidence beyond feelings of fluency or familiarity.",
    frontend: {
      en: "Learn to choose and check effective study strategies.",
    },
  },
});
