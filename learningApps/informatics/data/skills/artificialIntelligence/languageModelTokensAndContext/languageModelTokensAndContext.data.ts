import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishSamplingFromChoosingTheMostLikelyToken_Skill_Data, distinguishTokensCharactersAndWords_Skill_Data, explainALanguageModelsContextWindow_Skill_Data, explainContextWindowOverflow_Skill_Data, explainNextTokenSelection_Skill_Data, explainTokens_Skill_Data } from './skills';

export const languageModelTokensAndContext_SkillGroup_Data = buildSkillGroupConfig({
  slug: "languageModelTokensAndContext",
  id: "eacbce78-8a3b-416e-8119-5fe49906f53a",
  name: {
    en: "Language Model Tokens and Context",
  },
  skills: {
    distinguishSamplingFromChoosingTheMostLikelyToken: distinguishSamplingFromChoosingTheMostLikelyToken_Skill_Data,
    distinguishTokensCharactersAndWords: distinguishTokensCharactersAndWords_Skill_Data,
    explainALanguageModelsContextWindow: explainALanguageModelsContextWindow_Skill_Data,
    explainContextWindowOverflow: explainContextWindowOverflow_Skill_Data,
    explainNextTokenSelection: explainNextTokenSelection_Skill_Data,
    explainTokens: explainTokens_Skill_Data,
  },
  description: {
    methodological: "Language models process tokens, evaluate possible continuations, and operate within a limited context window; model parameter count does not determine context length.",
    frontend: {
      en: "Discover how language models divide text into tokens and use context.",
    },
  },
});
