import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainCSMACA_Skill_Data = buildSkillConfig({
  slug: "explainCSMACA",
  id: "6525705d-4238-434e-bdec-11698781e0b6",
  name: {
    en: "Explain CSMA/CA",
  },
  description: {
    methodological: "Describe why a wireless network checks whether a radio channel is busy and seeks to reduce collisions through waiting and agreed access rules; avoidance does not guarantee that collisions never occur.",
    frontend: {
      en: "Explain how wireless devices try to avoid transmitting over a busy channel.",
    },
  },
});
