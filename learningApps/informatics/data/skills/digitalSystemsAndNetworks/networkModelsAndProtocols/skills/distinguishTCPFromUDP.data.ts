import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishTCPFromUDP_Skill_Data = buildSkillConfig({
  slug: "distinguishTCPFromUDP",
  id: "c12e79a7-2bf8-4564-8351-a433d905574d",
  name: {
    en: "Distinguish TCP from UDP",
  },
  description: {
    methodological: "TCP provides a managed data stream with acknowledgments; UDP sends datagrams without equivalent delivery guarantees at that layer.",
    frontend: {
      en: "Compare reliable TCP streams with UDP messages that lack those guarantees.",
    },
  },
});
