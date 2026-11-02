import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const dilution_Skill_Data = buildSkillConfig({
  slug: "dilution",
  id: "bf01c541-bd4e-4de9-9e52-81e3b17aa689",
  name: {
    en: "Dilution",
  },
  description: {
    methodological: "Use conservation of solute amount to relate concentrations and volumes before and after adding solvent.",
    frontend: {
      en: "Calculate how adding solvent changes concentration without changing solute amount.",
    },
  },
});
