import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { gasCompressors_Skill_Data, hydraulicActuators_Skill_Data, liquidPumps_Skill_Data, pneumaticActuators_Skill_Data } from './skills';

export const fluidMachines_SkillGroup_Data = buildSkillGroupConfig({
  slug: "fluidMachines",
  id: "9187f9ae-8ec0-47cd-88d4-b63ff79f763c",
  name: {
    en: "Fluid Machines",
  },
  skills: {
    gasCompressors: gasCompressors_Skill_Data,
    hydraulicActuators: hydraulicActuators_Skill_Data,
    liquidPumps: liquidPumps_Skill_Data,
    pneumaticActuators: pneumaticActuators_Skill_Data,
  },
  description: {
    methodological: "Mechanical energy can produce fluid flow, pressure or driven motion using distinct devices with different operating media.",
    frontend: {
      en: "Discover how pumps and actuators move liquids and gases.",
    },
  },
});
