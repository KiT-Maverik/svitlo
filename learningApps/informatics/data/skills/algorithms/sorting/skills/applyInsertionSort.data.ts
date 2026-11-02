import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyInsertionSort_Skill_Data = buildSkillConfig({
  slug: "applyInsertionSort",
  id: "8f11d73e-cce9-48f6-a432-3dc5c2af3ef4",
  name: {
    en: "Apply Insertion Sort",
  },
  description: {
    methodological: "Take the next item, find its correct place in an already sorted prefix, and shift larger values to the right.",
    frontend: {
      en: "Sort by inserting each new item into an already ordered section.",
    },
  },
});
