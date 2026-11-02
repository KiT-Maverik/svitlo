import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { accessASequenceElementByIndex_Skill_Data, distinguishArraysFromLinkedLists_Skill_Data, explainArrayStructure_Skill_Data, explainListStructure_Skill_Data, insertAnElementIntoASequence_Skill_Data, removeAnElementFromASequence_Skill_Data, traverseASequence_Skill_Data } from './skills';

export const sequences_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sequences",
  id: "d5b263c3-3b43-4643-8655-3541acac0461",
  name: {
    en: "Sequences",
  },
  skills: {
    accessASequenceElementByIndex: accessASequenceElementByIndex_Skill_Data,
    distinguishArraysFromLinkedLists: distinguishArraysFromLinkedLists_Skill_Data,
    explainArrayStructure: explainArrayStructure_Skill_Data,
    explainListStructure: explainListStructure_Skill_Data,
    insertAnElementIntoASequence: insertAnElementIntoASequence_Skill_Data,
    removeAnElementFromASequence: removeAnElementFromASequence_Skill_Data,
    traverseASequence: traverseASequence_Skill_Data,
  },
  description: {
    methodological: "Ordered collections including arrays, lists, and linked representations. Indexing, insertion, removal, and traversal have different requirements and costs.",
    frontend: {
      en: "Explore ordered collections and how to access, add and remove their elements.",
    },
  },
});
