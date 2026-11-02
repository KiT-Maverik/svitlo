import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainQuantization_Skill_Data = buildSkillConfig({
  slug: "explainQuantization",
  id: "911bdb7c-c1ea-4700-b918-d55f6d8f2659",
  name: {
    en: "Explain Quantization",
  },
  description: {
    methodological: "Show how representing weights or activations with fewer bits reduces memory use and may improve speed, while potentially changing numerical accuracy and output quality. This is a trade-off, not cost-free compression.",
    frontend: {
      en: "Understand how reduced numerical precision can save memory but change quality.",
    },
  },
});
