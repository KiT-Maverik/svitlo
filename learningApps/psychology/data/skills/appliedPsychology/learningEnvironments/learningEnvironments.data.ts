import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { feedbackInEducation_Skill_Data, learningEnvironmentDesign_Skill_Data, motivationalClimate_Skill_Data } from './skills';

export const learningEnvironments_SkillGroup_Data = buildSkillGroupConfig({
  slug: "learningEnvironments",
  id: "1086e6e8-5f7f-43d9-badf-b6290495535e",
  name: {
    en: "Learning Environments",
  },
  skills: {
    feedbackInEducation: feedbackInEducation_Skill_Data,
    learningEnvironmentDesign: learningEnvironmentDesign_Skill_Data,
    motivationalClimate: motivationalClimate_Skill_Data,
  },
  description: {
    methodological: "Educational psychology examines attention, feedback, motivation, and differences among learners to understand conditions for effective learning.",
    frontend: {
      en: "Discover how attention, motivation and feedback affect opportunities to learn.",
    },
  },
});
