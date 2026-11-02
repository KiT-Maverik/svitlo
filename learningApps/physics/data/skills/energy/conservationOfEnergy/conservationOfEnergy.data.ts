import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainTheLawOfConservationOfEnergy_Skill_Data, explainTheLossOfUsefulEnergy_Skill_Data, refuteTheIdeaThatEnergyDisappears_Skill_Data } from './skills';

export const conservationOfEnergy_SkillGroup_Data = buildSkillGroupConfig({
  slug: "conservationOfEnergy",
  id: "c7b7e7ed-800d-419b-8d90-6c664746ccbf",
  name: {
    en: "Conservation of Energy",
  },
  skills: {
    explainTheLawOfConservationOfEnergy: explainTheLawOfConservationOfEnergy_Skill_Data,
    explainTheLossOfUsefulEnergy: explainTheLossOfUsefulEnergy_Skill_Data,
    refuteTheIdeaThatEnergyDisappears: refuteTheIdeaThatEnergyDisappears_Skill_Data,
  },
  description: {
    methodological: "The total energy of an isolated system is conserved even as its form or distribution among bodies changes. A decrease in energy available for useful work is not its disappearance; for an open system, exchange with the surroundings must be considered.",
    frontend: {
      en: "Understand why the total energy of an isolated system is conserved.",
    },
  },
});
