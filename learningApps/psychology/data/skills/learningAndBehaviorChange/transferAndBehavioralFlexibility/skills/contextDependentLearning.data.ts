import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const contextDependentLearning_Skill_Data = buildSkillConfig({
  slug: "contextDependentLearning",
  id: "0e82cf43-0713-48f7-a1e6-f0216aba9b0a",
  name: {
    en: "Context-Dependent Learning",
  },
  description: {
    methodological: "Explain why a response learned in one setting may not transfer unchanged to another.",
    frontend: {
      en: "Recognize when learning depends strongly on the setting where it occurred.",
    },
  },
});
