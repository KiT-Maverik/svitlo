import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chooseAStructureForRequiredOperations_Skill_Data, compareCollectionInsertionCosts_Skill_Data, compareElementAccessCosts_Skill_Data, distinguishDataStructuresFromAlgorithms_Skill_Data } from './skills';

export const structureSelection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "structureSelection",
  id: "b609551b-57f5-4188-8083-39cc8e116420",
  name: {
    en: "Structure Selection",
  },
  skills: {
    chooseAStructureForRequiredOperations: chooseAStructureForRequiredOperations_Skill_Data,
    compareCollectionInsertionCosts: compareCollectionInsertionCosts_Skill_Data,
    compareElementAccessCosts: compareElementAccessCosts_Skill_Data,
    distinguishDataStructuresFromAlgorithms: distinguishDataStructuresFromAlgorithms_Skill_Data,
  },
  description: {
    methodological: "Select data structures based on required operations and evaluate access, insertion, and storage costs. The comparison concerns data organization rather than only algorithms that process it.",
    frontend: {
      en: "Choose data structures according to how a program needs to use its data.",
    },
  },
});
