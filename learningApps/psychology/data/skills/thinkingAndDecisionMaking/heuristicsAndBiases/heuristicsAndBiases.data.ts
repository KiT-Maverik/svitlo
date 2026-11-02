import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { anchoringBias_Skill_Data, availabilityHeuristic_Skill_Data, confirmationBias_Skill_Data, framingEffects_Skill_Data, fundamentalAttributionError_Skill_Data, hindsightBias_Skill_Data, representativenessHeuristic_Skill_Data } from './skills';

export const heuristicsAndBiases_SkillGroup_Data = buildSkillGroupConfig({
  slug: "heuristicsAndBiases",
  id: "ecfda315-3e86-4a7f-901f-6e4aeebc8cfe",
  name: {
    en: "Heuristics and Biases",
  },
  skills: {
    anchoringBias: anchoringBias_Skill_Data,
    availabilityHeuristic: availabilityHeuristic_Skill_Data,
    confirmationBias: confirmationBias_Skill_Data,
    framingEffects: framingEffects_Skill_Data,
    fundamentalAttributionError: fundamentalAttributionError_Skill_Data,
    hindsightBias: hindsightBias_Skill_Data,
    representativenessHeuristic: representativenessHeuristic_Skill_Data,
  },
  description: {
    methodological: "Fast judgments exploit convenient cues but may be systematically distorted by memory, presentation, or expectations.",
    frontend: {
      en: "Discover shortcuts and biases that influence judgments.",
    },
  },
});
