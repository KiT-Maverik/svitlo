import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishOSIFromTCPIP_Skill_Data = buildSkillConfig({
  slug: "distinguishOSIFromTCPIP",
  id: "453c8f7e-3d89-4cf9-aae3-7a70180443cb",
  name: {
    en: "Distinguish OSI from TCP/IP",
  },
  description: {
    methodological: "The OSI reference model has seven conceptual layers, whereas TCP/IP organizes real Internet protocols into a different set of functional layers.",
    frontend: {
      en: "Compare the conceptual OSI layers with the Internet's TCP/IP stack.",
    },
  },
});
