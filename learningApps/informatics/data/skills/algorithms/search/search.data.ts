import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { applyBinarySearch_Skill_Data, applyBinaryTreeSearch_Skill_Data, applyLinearSearch_Skill_Data, compareSearchMethodsByCheckCount_Skill_Data, identifyBinarySearchPrerequisites_Skill_Data, predictSearchScaling_Skill_Data } from './skills';

export const search_SkillGroup_Data = buildSkillGroupConfig({
  slug: "search",
  id: "a6099e8e-8662-45f0-aaa1-68b47e3ca133",
  name: {
    en: "Search",
  },
  skills: {
    applyBinarySearch: applyBinarySearch_Skill_Data,
    applyBinaryTreeSearch: applyBinaryTreeSearch_Skill_Data,
    applyLinearSearch: applyLinearSearch_Skill_Data,
    compareSearchMethodsByCheckCount: compareSearchMethodsByCheckCount_Skill_Data,
    identifyBinarySearchPrerequisites: identifyBinarySearchPrerequisites_Skill_Data,
    predictSearchScaling: predictSearchScaling_Skill_Data,
  },
  description: {
    methodological: "Methods of locating target items: scanning in order, halving a sorted range, or traversing an ordered tree. Each named algorithm has its own Skill, with prerequisite and comparison skills where independently meaningful.",
    frontend: {
      en: "Discover how different search methods find an item in a collection.",
    },
  },
});
