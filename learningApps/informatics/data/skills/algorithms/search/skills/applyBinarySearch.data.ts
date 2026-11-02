import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyBinarySearch_Skill_Data = buildSkillConfig({
  slug: "applyBinarySearch",
  id: "eada55a2-1744-405b-843c-df5dda18f92f",
  name: {
    en: "Apply Binary Search",
  },
  description: {
    methodological: "Inspect the middle element of a sorted range, discard the half that cannot contain the target, and repeat until a match or an empty range.",
    frontend: {
      en: "Find a value in sorted data by repeatedly discarding half the range.",
    },
  },
});
