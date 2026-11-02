import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const calorimetry_Skill_Data = buildSkillConfig({
  slug: "calorimetry",
  id: "24c3b3eb-a76b-4308-8cf6-3b5761909bf9",
  name: {
    en: "Calorimetry",
  },
  description: {
    methodological: "Infer heat transfer from measured temperature change, heat capacity and appropriate system boundaries, recognizing energy losses and measurement uncertainty.",
    frontend: {
      en: "Use temperature change to estimate heat transfer, accounting for heat losses.",
    },
  },
});
