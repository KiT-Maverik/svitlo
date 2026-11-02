import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { digitalDeviceComponents_SkillGroup_Data } from './digitalDeviceComponents/digitalDeviceComponents.data';
import { memoryAndStorage_SkillGroup_Data } from './memoryAndStorage/memoryAndStorage.data';
import { networkModelsAndProtocols_SkillGroup_Data } from './networkModelsAndProtocols/networkModelsAndProtocols.data';
import { networks_SkillGroup_Data } from './networks/networks.data';
import { numeralSystems_SkillGroup_Data } from './numeralSystems/numeralSystems.data';
import { operatingSystems_SkillGroup_Data } from './operatingSystems/operatingSystems.data';
import { representationAndStorage_SkillGroup_Data } from './representationAndStorage/representationAndStorage.data';
import { taskExecution_SkillGroup_Data } from './taskExecution/taskExecution.data';

export const digitalSystemsAndNetworks_SkillDomain_Data = buildSkillDomainConfig({
  slug: "digitalSystemsAndNetworks",
  id: "c57456de-291c-4b19-bd67-bccbcf9bbaa7",
  name: {
    en: "Digital Systems and Networks",
  },
  groups: {
    digitalDeviceComponents: digitalDeviceComponents_SkillGroup_Data,
    memoryAndStorage: memoryAndStorage_SkillGroup_Data,
    networkModelsAndProtocols: networkModelsAndProtocols_SkillGroup_Data,
    networks: networks_SkillGroup_Data,
    numeralSystems: numeralSystems_SkillGroup_Data,
    operatingSystems: operatingSystems_SkillGroup_Data,
    representationAndStorage: representationAndStorage_SkillGroup_Data,
    taskExecution: taskExecution_SkillGroup_Data,
  },
  description: {
    methodological: "Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.",
    frontend: {
      en: "Discover how computing devices, digital information and networks work together.",
    },
  },
});
