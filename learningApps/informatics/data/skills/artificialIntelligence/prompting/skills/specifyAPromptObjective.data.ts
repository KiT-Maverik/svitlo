import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const specifyAPromptObjective_Skill_Data = buildSkillConfig({
  slug: "specifyAPromptObjective",
  id: "7cbebe13-c48d-4818-8240-acbd8bb16d75",
  name: {
    en: "Specify a Prompt Objective",
  },
  description: {
    methodological: "Give a model a defined task and desired outcome, such as 'compare three explanations and highlight their differences,' instead of 'tell me something.' The objective specifies the work, not the output format.",
    frontend: {
      en: "State the precise task you want an AI assistant to accomplish.",
    },
  },
});
