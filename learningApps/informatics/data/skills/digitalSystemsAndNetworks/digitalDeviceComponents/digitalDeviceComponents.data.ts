import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishHardwareFromSoftware_Skill_Data, explainAProcessorsFunction_Skill_Data, identifyDigitalDevices_Skill_Data } from './skills';

export const digitalDeviceComponents_SkillGroup_Data = buildSkillGroupConfig({
  slug: "digitalDeviceComponents",
  id: "3ab25786-4f87-4cac-9bbd-87b780e69986",
  name: {
    en: "Digital Device Components",
  },
  skills: {
    distinguishHardwareFromSoftware: distinguishHardwareFromSoftware_Skill_Data,
    explainAProcessorsFunction: explainAProcessorsFunction_Skill_Data,
    identifyDigitalDevices: identifyDigitalDevices_Skill_Data,
  },
  description: {
    methodological: "Roles of computing components: processors execute instructions, memory holds working data, and hardware and software interact. Network transmission belongs to a different group.",
    frontend: {
      en: "Explore how hardware components and software perform different computing tasks.",
    },
  },
});
