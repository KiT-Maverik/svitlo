import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainALanguageModelsContextWindow_Skill_Data = buildSkillConfig({
  slug: "explainALanguageModelsContextWindow",
  id: "d4360ab9-32a7-4be5-8d74-40069809cf31",
  name: {
    en: "Explain a Language Model's Context Window",
  },
  description: {
    methodological: "Identify the limit on how many tokens a system can use for a request and understand that different models have different limits.",
    frontend: {
      en: "Understand why a language model can use only a limited amount of context.",
    },
  },
});
