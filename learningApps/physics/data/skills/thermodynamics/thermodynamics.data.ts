import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { heatTransferMechanisms_SkillGroup_Data } from './heatTransferMechanisms/heatTransferMechanisms.data';
import { phaseTransitions_SkillGroup_Data } from './phaseTransitions/phaseTransitions.data';
import { temperatureAndHeating_SkillGroup_Data } from './temperatureAndHeating/temperatureAndHeating.data';
import { thermalInsulation_SkillGroup_Data } from './thermalInsulation/thermalInsulation.data';

export const thermodynamics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "thermodynamics",
  id: "6cfe5648-73f4-4db4-a52b-f070d7f11430",
  name: {
    en: "Thermodynamics",
  },
  groups: {
    heatTransferMechanisms: heatTransferMechanisms_SkillGroup_Data,
    phaseTransitions: phaseTransitions_SkillGroup_Data,
    temperatureAndHeating: temperatureAndHeating_SkillGroup_Data,
    thermalInsulation: thermalInsulation_SkillGroup_Data,
  },
  description: {
    methodological: "Thermal processes describe changes in temperature, energy transfer, and transitions between states of matter. Macroscopic observations are distinguished from particle-level explanations in the neighboring Domain.",
    frontend: {
      en: "Explore temperature, heating, energy transfer and changes of state.",
    },
  },
});
