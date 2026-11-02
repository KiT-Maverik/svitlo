import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyBinarySearchPrerequisites_Skill_Data = buildSkillConfig({
  slug: "identifyBinarySearchPrerequisites",
  id: "c8fbb932-bc99-4db1-82ca-a0a9531fceef",
  name: {
    en: "Identify Binary Search Prerequisites",
  },
  description: {
    methodological: "Verify that elements are sorted under a consistent criterion and support less-than/greater-than comparisons; without these properties, eliminating half the candidates may be incorrect.",
    frontend: {
      en: "Check whether data meets the sorting requirements for binary search.",
    },
  },
});
