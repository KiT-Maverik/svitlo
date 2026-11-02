import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyMaximumFinding_Skill_Data = buildSkillConfig({
  slug: "applyMaximumFinding",
  id: "5818fb78-28b0-406a-803f-3b1a71f65b5b",
  name: {
    en: "Apply Maximum Finding",
  },
  description: {
    methodological: "Maintain the largest value seen so far and update it when a larger number appears.",
    frontend: {
      en: "Track the largest value seen while traversing a collection.",
    },
  },
});
