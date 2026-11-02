import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { computerHardwareBuses_Skill_Data, computerPowerSupplyArchitecture_Skill_Data, computerThermalManagement_Skill_Data, displayHardware_Skill_Data, inputDeviceHardware_Skill_Data, mainMemoryHardware_Skill_Data, persistentDataStorage_Skill_Data, printedCircuitBoardInterconnects_Skill_Data, processorHardware_Skill_Data } from './skills';

export const computingHardware_SkillGroup_Data = buildSkillGroupConfig({
  slug: "computingHardware",
  id: "69c54fbe-8982-4bff-881a-a5aa8ac00b26",
  name: {
    en: "Computing Hardware",
  },
  skills: {
    computerHardwareBuses: computerHardwareBuses_Skill_Data,
    computerPowerSupplyArchitecture: computerPowerSupplyArchitecture_Skill_Data,
    computerThermalManagement: computerThermalManagement_Skill_Data,
    displayHardware: displayHardware_Skill_Data,
    inputDeviceHardware: inputDeviceHardware_Skill_Data,
    mainMemoryHardware: mainMemoryHardware_Skill_Data,
    persistentDataStorage: persistentDataStorage_Skill_Data,
    printedCircuitBoardInterconnects: printedCircuitBoardInterconnects_Skill_Data,
    processorHardware: processorHardware_Skill_Data,
  },
  description: {
    methodological: "Computer hardware combines execution, working memory, persistent storage, electrical interconnects, human input/output and power and thermal management. It is distinct from programming, operating systems and software data structures.",
    frontend: {
      en: "Explore the physical components of computing devices.",
    },
  },
});
