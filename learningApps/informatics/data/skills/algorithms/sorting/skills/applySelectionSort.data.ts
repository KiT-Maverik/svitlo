import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applySelectionSort_Skill_Data = buildSkillConfig({
  slug: "applySelectionSort",
  id: "d27b3cb1-5fd8-4ffd-becb-3b4f1f52d2a3",
  name: {
    en: "Apply Selection Sort",
  },
  description: {
    methodological: "On each pass, find the smallest remaining item and move it to the next position in the sorted prefix.",
    frontend: {
      en: "Sort items by repeatedly selecting the smallest remaining one.",
    },
  },
});
