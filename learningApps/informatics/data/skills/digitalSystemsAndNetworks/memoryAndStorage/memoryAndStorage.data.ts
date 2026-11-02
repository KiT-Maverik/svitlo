import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishRAMROMAndStorage_Skill_Data, explainPersistentStorage_Skill_Data, explainRAM_Skill_Data, explainThePurposeOfROM_Skill_Data } from './skills';

export const memoryAndStorage_SkillGroup_Data = buildSkillGroupConfig({
  slug: "memoryAndStorage",
  id: "d90fd556-c7a2-44d3-94c6-95433000e0af",
  name: {
    en: "Memory and Storage",
  },
  skills: {
    distinguishRAMROMAndStorage: distinguishRAMROMAndStorage_Skill_Data,
    explainPersistentStorage: explainPersistentStorage_Skill_Data,
    explainRAM: explainRAM_Skill_Data,
    explainThePurposeOfROM: explainThePurposeOfROM_Skill_Data,
  },
  description: {
    methodological: "Distinguishes temporary working memory from nonvolatile file storage, along with the different functions of RAM, ROM, and storage devices.",
    frontend: {
      en: "Discover what temporary memory, firmware memory and file storage each do.",
    },
  },
});
