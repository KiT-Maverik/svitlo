import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareDenseAndMoEModels_Skill_Data = buildSkillConfig({
  slug: "compareDenseAndMoEModels",
  id: "bb75c08c-c9a6-4ab2-9f63-9a2e0caf6ca3",
  name: {
    en: "Compare Dense and MoE Models",
  },
  description: {
    methodological: "Distinguish an architecture activating all relevant dense computation from a mixture-of-experts architecture where a router activates only some expert blocks. Total parameter count is not the same as the number of parameters active for each token.",
    frontend: {
      en: "Compare models that activate many parameters with models using selected experts.",
    },
  },
});
