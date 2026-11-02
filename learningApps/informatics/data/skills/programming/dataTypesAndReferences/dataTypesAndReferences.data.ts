import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishValueCopyingFromSharedReferences_Skill_Data, distinguishValueTypes_Skill_Data, explainADataTypeContract_Skill_Data, explainCompositeDataStructures_Skill_Data, explainPrimitiveValuesInALanguage_Skill_Data, validateDataAgainstAContract_Skill_Data } from './skills';

export const dataTypesAndReferences_SkillGroup_Data = buildSkillGroupConfig({
  slug: "dataTypesAndReferences",
  id: "c98fa643-b234-4026-8bce-c2fede1d60e3",
  name: {
    en: "Data Types and References",
  },
  skills: {
    distinguishValueCopyingFromSharedReferences: distinguishValueCopyingFromSharedReferences_Skill_Data,
    distinguishValueTypes: distinguishValueTypes_Skill_Data,
    explainADataTypeContract: explainADataTypeContract_Skill_Data,
    explainCompositeDataStructures: explainCompositeDataStructures_Skill_Data,
    explainPrimitiveValuesInALanguage: explainPrimitiveValuesInALanguage_Skill_Data,
    validateDataAgainstAContract: validateDataAgainstAContract_Skill_Data,
  },
  description: {
    methodological: "Types determine valid forms of values and operations; storage and state-passing behavior depend on the programming language. Do not assume every language draws the same boundary between primitives and objects.",
    frontend: {
      en: "Explore how types and references affect the values programs can use.",
    },
  },
});
