import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { fluidMachines_SkillGroup_Data } from './fluidMachines/fluidMachines.data';
import { heatTransferEquipment_SkillGroup_Data } from './heatTransferEquipment/heatTransferEquipment.data';
import { ventilationAndAirTreatment_SkillGroup_Data } from './ventilationAndAirTreatment/ventilationAndAirTreatment.data';

export const thermalAndFluidDevices_SkillDomain_Data = buildSkillDomainConfig({
  slug: "thermalAndFluidDevices",
  id: "d33742d7-e1a8-4ade-a7e6-dc3506b28a1c",
  name: {
    en: "Thermal and Fluid Devices",
  },
  groups: {
    fluidMachines: fluidMachines_SkillGroup_Data,
    heatTransferEquipment: heatTransferEquipment_SkillGroup_Data,
    ventilationAndAirTreatment: ventilationAndAirTreatment_SkillGroup_Data,
  },
  description: {
    methodological: "Practical equipment moves heat, air and other fluids through controlled component chains. Here the object of study is the apparatus and its operating cycle, not the isolated thermodynamic or fluid laws.",
    frontend: {
      en: "Explore practical machines that control heating, cooling and the flow of fluids.",
    },
  },
});
