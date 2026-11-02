import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTokenRing_Skill_Data = buildSkillConfig({
  slug: "explainTokenRing",
  id: "2c3627a4-f409-4512-a6de-c95499100d89",
  name: {
    en: "Explain Token Ring",
  },
  description: {
    methodological: "Describe how a token grants transmission rights to participants in a defined sequence and how this differs from devices contending for access to a shared medium.",
    frontend: {
      en: "Explore how passing a token can control which device may send data.",
    },
  },
});
