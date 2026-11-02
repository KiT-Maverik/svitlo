import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { actuatorDriverCompatibility_Skill_Data, hardwareInputOutputInterfaces_Skill_Data, microcontrollerArchitecture_Skill_Data, sensorInterfaceCompatibility_Skill_Data } from './skills';

export const embeddedHardware_SkillGroup_Data = buildSkillGroupConfig({
  slug: "embeddedHardware",
  id: "202be020-95eb-4cdc-8821-b5d7685462bc",
  name: {
    en: "Embedded Hardware",
  },
  skills: {
    actuatorDriverCompatibility: actuatorDriverCompatibility_Skill_Data,
    hardwareInputOutputInterfaces: hardwareInputOutputInterfaces_Skill_Data,
    microcontrollerArchitecture: microcontrollerArchitecture_Skill_Data,
    sensorInterfaceCompatibility: sensorInterfaceCompatibility_Skill_Data,
  },
  description: {
    methodological: "Controllers communicate with sensors and actuators through real physical interfaces; programming concepts are treated separately in Informatics.",
    frontend: {
      en: "Discover the hardware connections used in embedded control devices.",
    },
  },
});
