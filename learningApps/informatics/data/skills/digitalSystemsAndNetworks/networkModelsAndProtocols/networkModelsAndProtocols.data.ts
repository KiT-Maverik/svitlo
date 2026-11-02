import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareNetworkAccessMethods_Skill_Data, distinguishHTTPFromHTTPS_Skill_Data, distinguishOSIFromTCPIP_Skill_Data, distinguishTCPFromUDP_Skill_Data, explainANetworkProtocol_Skill_Data, explainCSMACA_Skill_Data, explainCSMACD_Skill_Data, explainDNS_Skill_Data, explainTheOSILayers_Skill_Data, explainThePurposeOfIP_Skill_Data, explainTokenRing_Skill_Data } from './skills';

export const networkModelsAndProtocols_SkillGroup_Data = buildSkillGroupConfig({
  slug: "networkModelsAndProtocols",
  id: "e5545405-2136-4a34-a261-6b9308799ae1",
  name: {
    en: "Network Models and Protocols",
  },
  skills: {
    compareNetworkAccessMethods: compareNetworkAccessMethods_Skill_Data,
    distinguishHTTPFromHTTPS: distinguishHTTPFromHTTPS_Skill_Data,
    distinguishOSIFromTCPIP: distinguishOSIFromTCPIP_Skill_Data,
    distinguishTCPFromUDP: distinguishTCPFromUDP_Skill_Data,
    explainANetworkProtocol: explainANetworkProtocol_Skill_Data,
    explainCSMACA: explainCSMACA_Skill_Data,
    explainCSMACD: explainCSMACD_Skill_Data,
    explainDNS: explainDNS_Skill_Data,
    explainTheOSILayers: explainTheOSILayers_Skill_Data,
    explainThePurposeOfIP: explainThePurposeOfIP_Skill_Data,
    explainTokenRing: explainTokenRing_Skill_Data,
  },
  description: {
    methodological: "Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.",
    frontend: {
      en: "Discover how networking protocols specify the rules for sending information.",
    },
  },
});
