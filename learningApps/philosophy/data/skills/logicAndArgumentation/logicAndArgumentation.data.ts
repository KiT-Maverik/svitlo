import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { argumentativeFallacies_SkillGroup_Data } from './argumentativeFallacies/argumentativeFallacies.data';
import { argumentsAndInference_SkillGroup_Data } from './argumentsAndInference/argumentsAndInference.data';
import { deductiveReasoning_SkillGroup_Data } from './deductiveReasoning/deductiveReasoning.data';
import { nonDeductiveReasoning_SkillGroup_Data } from './nonDeductiveReasoning/nonDeductiveReasoning.data';
import { predicateLogic_SkillGroup_Data } from './predicateLogic/predicateLogic.data';
import { propositionalLogic_SkillGroup_Data } from './propositionalLogic/propositionalLogic.data';

export const logicAndArgumentation_SkillDomain_Data = buildSkillDomainConfig({
  slug: "logicAndArgumentation",
  id: "ad30ef0a-43a4-449a-9b2f-c37e41b7d5a4",
  name: {
    en: "Logic and Argumentation",
  },
  groups: {
    argumentativeFallacies: argumentativeFallacies_SkillGroup_Data,
    argumentsAndInference: argumentsAndInference_SkillGroup_Data,
    deductiveReasoning: deductiveReasoning_SkillGroup_Data,
    nonDeductiveReasoning: nonDeductiveReasoning_SkillGroup_Data,
    predicateLogic: predicateLogic_SkillGroup_Data,
    propositionalLogic: propositionalLogic_SkillGroup_Data,
  },
  description: {
    methodological: "The central question is whether reasons support a conclusion and in what way. Formal entailment, defeasible inference, and argumentative defects are distinguished from psychological causes of belief, which belong chiefly to Psychology.",
    frontend: {
      en: "Learn to evaluate whether reasons support a conclusion and recognize faulty reasoning.",
    },
  },
});
