import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyMinimumFinding_Skill_Data = buildSkillConfig({
  slug: "applyMinimumFinding",
  id: "002178c5-f6c6-4d2b-9cc8-b295198fc3c8",
  name: {
    en: "Apply Minimum Finding",
  },
  description: {
    methodological: "Maintain the smallest value seen so far and update it when a smaller number appears.",
    frontend: {
      en: "Track the smallest value seen while traversing a collection.",
    },
  },
});
