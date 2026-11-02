import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyAITasks_Skill_Data, distinguishRulesFromTrainedModels_Skill_Data, explainGenerativeAI_Skill_Data, explainLearningFromExamples_Skill_Data, explainPredictiveAI_Skill_Data, identifyAPotentialAIError_Skill_Data } from './skills';

export const aIFundamentals_SkillGroup_Data = buildSkillGroupConfig({
  slug: "aIFundamentals",
  id: "1b282e43-c07f-4307-aa1a-0e2c01bcadef",
  name: {
    en: "AI Fundamentals",
  },
  skills: {
    classifyAITasks: classifyAITasks_Skill_Data,
    distinguishRulesFromTrainedModels: distinguishRulesFromTrainedModels_Skill_Data,
    explainGenerativeAI: explainGenerativeAI_Skill_Data,
    explainLearningFromExamples: explainLearningFromExamples_Skill_Data,
    explainPredictiveAI: explainPredictiveAI_Skill_Data,
    identifyAPotentialAIError: identifyAPotentialAIError_Skill_Data,
  },
  description: {
    methodological: "Explores the roles of programmed rules and training data in AI, common task objectives, and limits of result reliability. Classify tasks by their desired outputs, not only by a model's name or underlying mathematical technique.",
    frontend: {
      en: "Explore the differences between programmed rules, trained models and AI tasks.",
    },
  },
});
