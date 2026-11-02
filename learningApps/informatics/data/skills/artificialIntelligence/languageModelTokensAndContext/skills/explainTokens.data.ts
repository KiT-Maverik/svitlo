import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTokens_Skill_Data = buildSkillConfig({
  slug: "explainTokens",
  id: "b4e37008-55e5-413d-a832-e193f33dfff1",
  name: {
    en: "Explain Tokens",
  },
  description: {
    methodological: "Understand a token as a unit defined by a tokenizer: single letters, word fragments, whole words, or punctuation may be encoded in different ways.",
    frontend: {
      en: "Understand tokens as model-specific units of text representation.",
    },
  },
});
