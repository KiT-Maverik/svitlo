import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareModelMemoryRequirements_Skill_Data = buildSkillConfig({
  slug: "compareModelMemoryRequirements",
  id: "47fe7fe6-516d-4f52-aa11-4d49d3d2ae7e",
  name: {
    en: "Compare Model Memory Requirements",
  },
  description: {
    methodological: "Estimate RAM or GPU memory needed for model weights and runtime working data at a specified numerical precision and context length. Disk file size is not the same as peak runtime memory use.",
    frontend: {
      en: "Estimate the memory required to run a model rather than just store its files.",
    },
  },
});
