import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishBinaryAndHexadecimal_Skill_Data = buildSkillConfig({
  slug: "distinguishBinaryAndHexadecimal",
  id: "595295a3-72b0-49d0-a66a-1b09ae6e69a4",
  name: {
    en: "Distinguish Binary and Hexadecimal",
  },
  description: {
    methodological: "Explain that one hexadecimal digit corresponds to four bits and shortens the representation without changing the number's value.",
    frontend: {
      en: "Understand why hexadecimal is a shorter way to write groups of bits.",
    },
  },
});
