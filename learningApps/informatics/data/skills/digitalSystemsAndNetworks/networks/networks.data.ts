import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishTheInternetFromTheWeb_Skill_Data, explainNetworkMessageDelivery_Skill_Data, explainThePurposeOfAComputerNetwork_Skill_Data, explainWirelessCommunication_Skill_Data } from './skills';

export const networks_SkillGroup_Data = buildSkillGroupConfig({
  slug: "networks",
  id: "196716f7-13e8-4ff6-b81d-c4f82c9ca18e",
  name: {
    en: "Networks",
  },
  skills: {
    distinguishTheInternetFromTheWeb: distinguishTheInternetFromTheWeb_Skill_Data,
    explainNetworkMessageDelivery: explainNetworkMessageDelivery_Skill_Data,
    explainThePurposeOfAComputerNetwork: explainThePurposeOfAComputerNetwork_Skill_Data,
    explainWirelessCommunication: explainWirelessCommunication_Skill_Data,
  },
  description: {
    methodological: "Information exchange between connected devices, the distinction between the Internet and Web services, and communication channels. These competencies concern delivery, not message reliability or trustworthiness.",
    frontend: {
      en: "Discover how connected devices send messages and share resources.",
    },
  },
});
