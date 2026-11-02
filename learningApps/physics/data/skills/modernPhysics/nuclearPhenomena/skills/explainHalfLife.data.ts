import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainHalfLife_Skill_Data = buildSkillConfig({
  slug: "explainHalfLife",
  id: "abd2d230-07c6-4986-bbdb-9434cac88287",
  name: {
    en: "Explain half-life",
  },
  description: {
    methodological: "Half-life describes the statistical decline in the number of unstable nuclei in a population, not the lifetime of an individual nucleus.",
    frontend: {
      en: "Understand half-life as a statistical pattern across many unstable nuclei.",
    },
  },
});
