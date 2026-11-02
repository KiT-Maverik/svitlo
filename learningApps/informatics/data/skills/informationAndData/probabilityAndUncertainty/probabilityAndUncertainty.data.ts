import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareProbabilitiesOfSimpleEvents_Skill_Data, distinguishPossibilityFromProbability_Skill_Data, distinguishRandomAndDeterministicEvents_Skill_Data, explainEventPossibility_Skill_Data, explainEventProbability_Skill_Data, explainLimitsOfPrediction_Skill_Data, useRandomnessInAModel_Skill_Data } from './skills';

export const probabilityAndUncertainty_SkillGroup_Data = buildSkillGroupConfig({
  slug: "probabilityAndUncertainty",
  id: "8194d9fb-a38f-487b-b644-362535e13593",
  name: {
    en: "Probability and Uncertainty",
  },
  skills: {
    compareProbabilitiesOfSimpleEvents: compareProbabilitiesOfSimpleEvents_Skill_Data,
    distinguishPossibilityFromProbability: distinguishPossibilityFromProbability_Skill_Data,
    distinguishRandomAndDeterministicEvents: distinguishRandomAndDeterministicEvents_Skill_Data,
    explainEventPossibility: explainEventPossibility_Skill_Data,
    explainEventProbability: explainEventProbability_Skill_Data,
    explainLimitsOfPrediction: explainLimitsOfPrediction_Skill_Data,
    useRandomnessInAModel: useRandomnessInAModel_Skill_Data,
  },
  description: {
    methodological: "Distinguishing possible and impossible outcomes, probabilistic models, comparisons of likelihoods, and limits of prediction. Randomness as a source of variation in a digital model is distinct from assessing a particular risk.",
    frontend: {
      en: "Explore possible events, their chances and the limits of prediction.",
    },
  },
});
