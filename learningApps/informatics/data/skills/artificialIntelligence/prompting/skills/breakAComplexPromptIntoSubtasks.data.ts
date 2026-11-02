import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const breakAComplexPromptIntoSubtasks_Skill_Data = buildSkillConfig({
  slug: "breakAComplexPromptIntoSubtasks",
  id: "d6f91678-7346-4d54-aad0-b9382f0a0ef6",
  name: {
    en: "Break a Complex Prompt into Subtasks",
  },
  description: {
    methodological: "Split a multi-stage request into sequential prompts with verifiable intermediate outcomes while preserving the original objective.",
    frontend: {
      en: "Divide a complicated request into smaller steps with results you can verify.",
    },
  },
});
