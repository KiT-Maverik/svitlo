import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainNextTokenSelection_Skill_Data = buildSkillConfig({
  slug: "explainNextTokenSelection",
  id: "f2386126-0f43-4cf4-96cf-67f8f3e8582c",
  name: {
    en: "Explain Next-Token Selection",
  },
  description: {
    methodological: "A model computes a probability distribution over continuations given the available context, then incorporates the chosen token into the context for the next step.",
    frontend: {
      en: "Explain how language models choose a possible next token from context.",
    },
  },
});
