import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { calculateGravitationalPotentialEnergy_Skill_Data, classifyFormsOfEnergy_Skill_Data, distinguishEnergyFromItsSource_Skill_Data, explainKineticEnergyAsEnergyOfMotion_Skill_Data, explainPotentialEnergy_Skill_Data } from './skills';

export const formsOfEnergy_SkillGroup_Data = buildSkillGroupConfig({
  slug: "formsOfEnergy",
  id: "854d44a8-a3d8-4280-85f3-2f0c0b546cc6",
  name: {
    en: "Forms of Energy",
  },
  skills: {
    calculateGravitationalPotentialEnergy: calculateGravitationalPotentialEnergy_Skill_Data,
    classifyFormsOfEnergy: classifyFormsOfEnergy_Skill_Data,
    distinguishEnergyFromItsSource: distinguishEnergyFromItsSource_Skill_Data,
    explainKineticEnergyAsEnergyOfMotion: explainKineticEnergyAsEnergyOfMotion_Skill_Data,
    explainPotentialEnergy: explainPotentialEnergy_Skill_Data,
  },
  description: {
    methodological: "Motion, position, deformation, and internal state can be associated with different forms of energy; descriptions should refer to a specific physical system.",
    frontend: {
      en: "Recognize different forms of energy in changing physical situations.",
    },
  },
});
