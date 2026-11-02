import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainConcurrentExecution_Skill_Data = buildSkillConfig({
  slug: "explainConcurrentExecution",
  id: "71c6cbc7-f7a5-4cd5-b7ed-efe6e32f279b",
  name: {
    en: "Explain Concurrent Execution",
  },
  description: {
    methodological: "Explain how several tasks make progress through interleaved steps or waiting for events without requiring instructions to run simultaneously. Contrast this with completing each task fully before starting the next.",
    frontend: {
      en: "Understand how several tasks can make progress without running at exactly the same moment.",
    },
  },
});
