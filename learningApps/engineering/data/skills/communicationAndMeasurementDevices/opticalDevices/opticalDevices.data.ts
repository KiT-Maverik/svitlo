import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { cameraHardware_Skill_Data, fiberOpticCommunicationSystems_Skill_Data, identifyLaserDeviceHazards_Skill_Data, laserDeviceArchitecture_Skill_Data, opticalComponentSuitability_Skill_Data } from './skills';

export const opticalDevices_SkillGroup_Data = buildSkillGroupConfig({
  slug: "opticalDevices",
  id: "0fa1eeda-d99e-46e6-83d6-dee6fcd43014",
  name: {
    en: "Optical Devices",
  },
  skills: {
    cameraHardware: cameraHardware_Skill_Data,
    fiberOpticCommunicationSystems: fiberOpticCommunicationSystems_Skill_Data,
    identifyLaserDeviceHazards: identifyLaserDeviceHazards_Skill_Data,
    laserDeviceArchitecture: laserDeviceArchitecture_Skill_Data,
    opticalComponentSuitability: opticalComponentSuitability_Skill_Data,
  },
  description: {
    methodological: "Optical components manipulate or detect light for imaging, sensing and transmission; lasers require particular source and exposure precautions.",
    frontend: {
      en: "Learn how optical devices manipulate light for imaging and communication.",
    },
  },
});
