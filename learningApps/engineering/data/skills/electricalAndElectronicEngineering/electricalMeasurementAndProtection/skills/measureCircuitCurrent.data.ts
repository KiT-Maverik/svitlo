import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const measureCircuitCurrent_Skill_Data = buildSkillConfig({
  slug: "measureCircuitCurrent",
  id: "6ab7298a-e74b-4fde-9a3f-f6b64541c5cb",
  name: {
    en: "Measure circuit current",
  },
  description: {
    methodological: "Choose an appropriate sensing method and insertion point for a selected branch.",
    frontend: {
      en: "Measure current through a circuit without connecting the meter incorrectly.",
    },
  },
});
