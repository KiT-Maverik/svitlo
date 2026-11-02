import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { antennaFunctions_Skill_Data, communicationsInfrastructure_Skill_Data, radioReceivers_Skill_Data, radioTransmitters_Skill_Data, traceACommunicationSignalChain_Skill_Data } from './skills';

export const communicationHardware_SkillGroup_Data = buildSkillGroupConfig({
  slug: "communicationHardware",
  id: "8d97fde8-65d4-4e43-a83b-447009a4f243",
  name: {
    en: "Communication Hardware",
  },
  skills: {
    antennaFunctions: antennaFunctions_Skill_Data,
    communicationsInfrastructure: communicationsInfrastructure_Skill_Data,
    radioReceivers: radioReceivers_Skill_Data,
    radioTransmitters: radioTransmitters_Skill_Data,
    traceACommunicationSignalChain: traceACommunicationSignalChain_Skill_Data,
  },
  description: {
    methodological: "Physical communication chains depend on transducers, suitable electromagnetic or wired paths and receiving equipment.",
    frontend: {
      en: "Discover the components that send and receive information.",
    },
  },
});
