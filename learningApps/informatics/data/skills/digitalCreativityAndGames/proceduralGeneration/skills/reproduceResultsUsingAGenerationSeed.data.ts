import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const reproduceResultsUsingAGenerationSeed_Skill_Data = buildSkillConfig({
  slug: "reproduceResultsUsingAGenerationSeed",
  id: "e28d313e-86fa-45a4-b20f-432f99a12138",
  name: {
    en: "Reproduce Results Using a Generation Seed",
  },
  description: {
    methodological: "Explain why the same pseudorandom seed, algorithm, parameters, and call order produce identical results. Changing any of these may break reproducibility.",
    frontend: {
      en: "Understand how a fixed seed and unchanged rules reproduce the same result.",
    },
  },
});
