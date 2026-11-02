import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishSamplingFromChoosingTheMostLikelyToken_Skill_Data = buildSkillConfig({
  slug: "distinguishSamplingFromChoosingTheMostLikelyToken",
  id: "5f2b4a96-a6e8-46d0-aeeb-a8c84da9ada5",
  name: {
    en: "Distinguish Sampling from Choosing the Most Likely Token",
  },
  description: {
    methodological: "Compare decoding by sampling from a probability distribution with deterministically selecting its highest-probability continuation.",
    frontend: {
      en: "Compare choosing the most likely token with sampling other possible continuations.",
    },
  },
});
