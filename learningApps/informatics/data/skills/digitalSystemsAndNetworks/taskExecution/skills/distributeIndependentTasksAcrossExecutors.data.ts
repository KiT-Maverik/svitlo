import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distributeIndependentTasksAcrossExecutors_Skill_Data = buildSkillConfig({
  slug: "distributeIndependentTasksAcrossExecutors",
  id: "fc6d08e8-022d-4e5a-b48f-3a90a047ca91",
  name: {
    en: "Distribute Independent Tasks Across Executors",
  },
  description: {
    methodological: "Plan which subtasks can run simultaneously and which must wait for dependent results in a model computing system. For example, process several images independently before combining their outputs.",
    frontend: {
      en: "Plan which tasks can run together and which must wait for other results.",
    },
  },
});
