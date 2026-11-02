import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainDoubleBlinding_Skill_Data = buildSkillConfig({
  slug: "explainDoubleBlinding",
  id: "f42fcf85-ae99-4495-8977-8d10cd57e74c",
  name: {
    en: "Explain double blinding",
  },
  description: {
    methodological: "Identify when both participants and interacting researchers or outcome assessors are kept unaware of allocation, and why such a design is neither always feasible nor universally required.",
    frontend: {
      en: "Explore how blinding both participants and researchers can reduce some biases.",
    },
  },
});
