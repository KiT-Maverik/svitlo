import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainRandomAssignment_Skill_Data = buildSkillConfig({
  slug: "explainRandomAssignment",
  id: "b48d17a0-8bc2-4473-b726-c541c66c379c",
  name: {
    en: "Explain random assignment",
  },
  description: {
    methodological: "Show how allocating participants or units by chance can reduce systematic pre-existing differences between comparison groups.",
    frontend: {
      en: "Explain how assigning groups by chance can reduce pre-existing differences.",
    },
  },
});
