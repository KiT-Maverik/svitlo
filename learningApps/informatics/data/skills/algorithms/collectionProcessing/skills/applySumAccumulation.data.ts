import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applySumAccumulation_Skill_Data = buildSkillConfig({
  slug: "applySumAccumulation",
  id: "c9b0d468-57c3-4e48-90ce-f1aacc8a2536",
  name: {
    en: "Apply Sum Accumulation",
  },
  description: {
    methodological: "Traverse a numeric collection, adding each value to an accumulator initialized to zero.",
    frontend: {
      en: "Add collection values into a running total.",
    },
  },
});
