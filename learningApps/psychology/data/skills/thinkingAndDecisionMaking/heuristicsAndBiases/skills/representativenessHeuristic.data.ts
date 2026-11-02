import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const representativenessHeuristic_Skill_Data = buildSkillConfig({
  slug: "representativenessHeuristic",
  id: "473f6cca-2007-45d8-8684-d2a9757d6b50",
  name: {
    en: "Representativeness Heuristic",
  },
  description: {
    methodological: "Explain judging likelihood by resemblance to a familiar category while neglecting relevant background information.",
    frontend: {
      en: "Recognize when similarity to a stereotype replaces relevant probability.",
    },
  },
});
