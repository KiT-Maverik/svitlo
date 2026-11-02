import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateMaterialDurability_Skill_Data = buildSkillConfig({
  slug: "evaluateMaterialDurability",
  id: "3066e5ef-3cb2-4d86-9d70-f2a77274b94e",
  name: {
    en: "Evaluate material durability",
  },
  description: {
    methodological: "Connect wear, corrosion, fatigue or exposure to the expected lifetime of a part.",
    frontend: {
      en: "Compare materials by how well they survive wear and environmental exposure.",
    },
  },
});
