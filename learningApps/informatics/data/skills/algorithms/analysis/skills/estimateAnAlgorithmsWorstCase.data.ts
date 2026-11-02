import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const estimateAnAlgorithmsWorstCase_Skill_Data = buildSkillConfig({
  slug: "estimateAnAlgorithmsWorstCase",
  id: "0dfe5db6-c92a-46ed-bbfb-c110a90c9886",
  name: {
    en: "Estimate an Algorithm's Worst Case",
  },
  description: {
    methodological: "Determine an upper bound on checks for a given strategy and rules, without confusing it with the steps taken in one lucky execution.",
    frontend: {
      en: "Estimate the most checks an algorithm could require in its worst case.",
    },
  },
});
