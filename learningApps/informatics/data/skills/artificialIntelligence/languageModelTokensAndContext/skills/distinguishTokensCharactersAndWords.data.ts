import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishTokensCharactersAndWords_Skill_Data = buildSkillConfig({
  slug: "distinguishTokensCharactersAndWords",
  id: "90cdf202-da8d-4d0e-a710-1cddf0de9c68",
  name: {
    en: "Distinguish Tokens, Characters, and Words",
  },
  description: {
    methodological: "Show that a word may contain several tokens and a token may contain several characters; the segmentation depends on the model and language.",
    frontend: {
      en: "Recognize why characters, words and tokens are not the same thing.",
    },
  },
});
