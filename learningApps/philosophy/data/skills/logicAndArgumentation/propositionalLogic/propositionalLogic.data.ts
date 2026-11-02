import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyAPropositionUsingATruthTable_Skill_Data, constructATruthTable_Skill_Data, distinguishAtomicFromCompoundPropositions_Skill_Data, interpretLogicalBiconditional_Skill_Data, interpretLogicalConjunction_Skill_Data, interpretLogicalDisjunction_Skill_Data, interpretLogicalNegation_Skill_Data, interpretMaterialImplication_Skill_Data, testDeductiveValidityUsingATruthTable_Skill_Data } from './skills';

export const propositionalLogic_SkillGroup_Data = buildSkillGroupConfig({
  slug: "propositionalLogic",
  id: "27fc05a1-0fee-4c85-bcef-0198a9b54055",
  name: {
    en: "Propositional Logic",
  },
  skills: {
    classifyAPropositionUsingATruthTable: classifyAPropositionUsingATruthTable_Skill_Data,
    constructATruthTable: constructATruthTable_Skill_Data,
    distinguishAtomicFromCompoundPropositions: distinguishAtomicFromCompoundPropositions_Skill_Data,
    interpretLogicalBiconditional: interpretLogicalBiconditional_Skill_Data,
    interpretLogicalConjunction: interpretLogicalConjunction_Skill_Data,
    interpretLogicalDisjunction: interpretLogicalDisjunction_Skill_Data,
    interpretLogicalNegation: interpretLogicalNegation_Skill_Data,
    interpretMaterialImplication: interpretMaterialImplication_Skill_Data,
    testDeductiveValidityUsingATruthTable: testDeductiveValidityUsingATruthTable_Skill_Data,
  },
  description: {
    methodological: "Truth-functional connections between propositions determine the logical properties of compound statements. Symbolic operators and truth tables clarify implications independent of the subject matter used in examples.",
    frontend: {
      en: "Discover how truth conditions work for statements joined by logical operators.",
    },
  },
});
