import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaporativeSeparation_Skill_Data = buildSkillConfig({
  slug: "evaporativeSeparation",
  id: "bad25d40-8d5a-4f63-a9d2-48f7a62f3392",
  name: {
    en: "Evaporative Separation",
  },
  description: {
    methodological: "Recover nonvolatile dissolved material by removing a volatile solvent, accounting for possible sample loss or decomposition.",
    frontend: {
      en: "Recover dissolved solids by removing a solvent through evaporation.",
    },
  },
});
