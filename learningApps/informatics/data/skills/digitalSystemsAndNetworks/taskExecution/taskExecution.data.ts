import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distributeIndependentTasksAcrossExecutors_Skill_Data, explainConcurrentExecution_Skill_Data, explainParallelExecution_Skill_Data } from './skills';

export const taskExecution_SkillGroup_Data = buildSkillGroupConfig({
  slug: "taskExecution",
  id: "6a3b0d90-8bd8-4f14-bfd8-8228aa553fe3",
  name: {
    en: "Task Execution",
  },
  skills: {
    distributeIndependentTasksAcrossExecutors: distributeIndependentTasksAcrossExecutors_Skill_Data,
    explainConcurrentExecution: explainConcurrentExecution_Skill_Data,
    explainParallelExecution: explainParallelExecution_Skill_Data,
  },
  description: {
    methodological: "Sequential execution, interleaving, and actual simultaneous work by multiple executors affect operation order and resource use. Concurrency organizes overlapping task progress; parallelism means operations truly execute at the same time. They are related but not identical.",
    frontend: {
      en: "Discover the difference between overlapping tasks and truly simultaneous work.",
    },
  },
});
