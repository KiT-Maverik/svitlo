import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const homogeneousAndHeterogeneousSamples_Skill_Data = buildSkillConfig({
  slug: "homogeneousAndHeterogeneousSamples",
  id: "747dd6bb-d6b4-4c4d-997c-a90fc6d97551",
  name: {
    en: "Homogeneous and Heterogeneous Samples",
  },
  description: {
    methodological: "Classify samples by whether their composition and phases are uniform at the relevant scale.",
    frontend: {
      en: "Tell whether a sample is uniform or contains visibly different parts or phases.",
    },
  },
});
