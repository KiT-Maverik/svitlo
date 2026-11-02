import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyBubbleSort_Skill_Data = buildSkillConfig({
  slug: "applyBubbleSort",
  id: "8d93d23b-c641-4b73-8361-ede81e84e9d4",
  name: {
    en: "Apply Bubble Sort",
  },
  description: {
    methodological: "Compare adjacent elements and swap out-of-order pairs, repeating passes until the entire collection is correctly sorted.",
    frontend: {
      en: "Sort by swapping neighboring values that are in the wrong order.",
    },
  },
});
