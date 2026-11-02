import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const rotorcraftControl_Skill_Data = buildSkillConfig({
  slug: "rotorcraftControl",
  id: "fa901ccc-c6e9-4a91-8a54-281e89f5f094",
  name: {
    en: "Rotorcraft control",
  },
  description: {
    methodological: "Trace changes in rotor thrust to hovering and maneuvering.",
    frontend: {
      en: "Understand how rotorcraft control changes lift and direction.",
    },
  },
});
