import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const findTheMostFrequentValue_Skill_Data = buildSkillConfig({
  slug: "findTheMostFrequentValue",
  id: "61f9ebb6-4b27-4e14-974a-92927cf57769",
  name: {
    en: "Find the Most Frequent Value",
  },
  description: {
    methodological: "Find or calculate the value with the highest frequency, allowing for multiple equally frequent values. The most frequent value need not equal the arithmetic mean or the largest number.",
    frontend: {
      en: "Identify the value that appears most frequently in a set.",
    },
  },
});
