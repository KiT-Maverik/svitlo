import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishLinearAndLogarithmicGrowth_Skill_Data = buildSkillConfig({
  slug: "distinguishLinearAndLogarithmicGrowth",
  id: "03958bf9-384b-4a11-87ba-b87506e0b9d6",
  name: {
    en: "Distinguish Linear and Logarithmic Growth",
  },
  description: {
    methodological: "Explain the difference between operations that grow approximately in proportion to input size and those tied to repeated halving; formal `O(n)` and `O(log n)` notation can deepen the analysis.",
    frontend: {
      en: "Compare growth proportional to input size with growth from repeated halving.",
    },
  },
});
