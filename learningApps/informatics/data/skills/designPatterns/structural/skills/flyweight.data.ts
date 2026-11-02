import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const flyweight_Skill_Data = buildSkillConfig({
  slug: "flyweight",
  id: "b6eadcb3-ce95-4f54-becb-ca2db81995f5",
  name: {
    en: "Flyweight",
  },
  description: {
    methodological: "Share the immutable portion of state among many similar objects to reduce memory consumption.",
    frontend: {
      en: "Share reusable object data to reduce unnecessary memory use.",
    },
  },
});
