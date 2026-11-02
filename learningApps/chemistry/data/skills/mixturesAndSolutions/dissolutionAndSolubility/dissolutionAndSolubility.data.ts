import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { dissolving_Skill_Data, gasSolubilityAndPressure_Skill_Data, saturation_Skill_Data, solubility_Skill_Data, solventSoluteCompatibility_Skill_Data, temperatureAndSolubility_Skill_Data } from './skills';

export const dissolutionAndSolubility_SkillGroup_Data = buildSkillGroupConfig({
  slug: "dissolutionAndSolubility",
  id: "5dcc9f58-7421-4f6d-9520-d77096ed007f",
  name: {
    en: "Dissolution and Solubility",
  },
  skills: {
    dissolving: dissolving_Skill_Data,
    gasSolubilityAndPressure: gasSolubilityAndPressure_Skill_Data,
    saturation: saturation_Skill_Data,
    solubility: solubility_Skill_Data,
    solventSoluteCompatibility: solventSoluteCompatibility_Skill_Data,
    temperatureAndSolubility: temperatureAndSolubility_Skill_Data,
  },
  description: {
    methodological: "Dissolution reflects competing interactions and may depend strongly on substance and conditions.",
    frontend: {
      en: "Explore what controls whether and how much of a substance dissolves.",
    },
  },
});
