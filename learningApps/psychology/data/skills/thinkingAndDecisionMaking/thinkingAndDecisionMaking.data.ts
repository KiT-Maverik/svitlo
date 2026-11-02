import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { choicesUnderUncertainty_SkillGroup_Data } from './choicesUnderUncertainty/choicesUnderUncertainty.data';
import { heuristicsAndBiases_SkillGroup_Data } from './heuristicsAndBiases/heuristicsAndBiases.data';
import { languageAndCognitiveAbilities_SkillGroup_Data } from './languageAndCognitiveAbilities/languageAndCognitiveAbilities.data';
import { mentalRepresentation_SkillGroup_Data } from './mentalRepresentation/mentalRepresentation.data';
import { reasoningAndProblemSolving_SkillGroup_Data } from './reasoningAndProblemSolving/reasoningAndProblemSolving.data';

export const thinkingAndDecisionMaking_SkillDomain_Data = buildSkillDomainConfig({
  slug: "thinkingAndDecisionMaking",
  id: "ef02b82d-bf4c-438b-8b82-f1a69855dada",
  name: {
    en: "Thinking and Decision-Making",
  },
  groups: {
    choicesUnderUncertainty: choicesUnderUncertainty_SkillGroup_Data,
    heuristicsAndBiases: heuristicsAndBiases_SkillGroup_Data,
    languageAndCognitiveAbilities: languageAndCognitiveAbilities_SkillGroup_Data,
    mentalRepresentation: mentalRepresentation_SkillGroup_Data,
    reasoningAndProblemSolving: reasoningAndProblemSolving_SkillGroup_Data,
  },
  description: {
    methodological: "Cognitive processes create concepts, guide inferences, solve problems, and select actions under limited information. The focus is what people actually do, not whether their reasoning satisfies a formal philosophical standard.",
    frontend: {
      en: "Explore how people form concepts, solve problems and make imperfect decisions.",
    },
  },
});
