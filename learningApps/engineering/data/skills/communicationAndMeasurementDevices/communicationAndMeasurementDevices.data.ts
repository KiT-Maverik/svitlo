import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { communicationHardware_SkillGroup_Data } from './communicationHardware/communicationHardware.data';
import { navigationEquipment_SkillGroup_Data } from './navigationEquipment/navigationEquipment.data';
import { opticalDevices_SkillGroup_Data } from './opticalDevices/opticalDevices.data';

export const communicationAndMeasurementDevices_SkillDomain_Data = buildSkillDomainConfig({
  slug: "communicationAndMeasurementDevices",
  id: "2a858c0c-bfe4-417f-bc32-251de4294f0b",
  name: {
    en: "Communication and Measurement Devices",
  },
  groups: {
    communicationHardware: communicationHardware_SkillGroup_Data,
    navigationEquipment: navigationEquipment_SkillGroup_Data,
    opticalDevices: opticalDevices_SkillGroup_Data,
  },
  description: {
    methodological: "Radio, optical and navigation equipment generates, propagates, detects and uses physical signals. Competencies concern real emitters, interfaces, receivers and instrumentation, rather than networking programs or generic data-processing algorithms.",
    frontend: {
      en: "Explore physical devices that transmit signals, form images and determine position.",
    },
  },
});
