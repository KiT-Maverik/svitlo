import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const classifyAITasks_Skill_Data = buildSkillConfig({
  slug: "classifyAITasks",
  id: "573cc148-e6f3-4f3f-871c-a5b1f733f2b0",
  name: {
    en: "Classify AI Tasks",
  },
  description: {
    methodological: "Determine whether a task aims to recognize a category or property of existing data, predict an unknown or future value, or generate new content. Object recognition in a photo, demand forecasting, and image generation have distinct desired outcomes. A generative language model also predicts successive tokens internally, so its mechanism is not identical to the task's objective.",
    frontend: {
      en: "Recognize whether an AI task classifies, predicts or generates content.",
    },
  },
});
