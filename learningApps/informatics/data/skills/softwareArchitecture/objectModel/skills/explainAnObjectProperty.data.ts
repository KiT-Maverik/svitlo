import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainAnObjectProperty_Skill_Data = buildSkillConfig({
  slug: "explainAnObjectProperty",
  id: "7db2da96-a2a1-487f-81c6-ed150fed34dc",
  name: {
    en: "Explain an Object Property",
  },
  description: {
    methodological: "Distinguish an attribute as a named state value from a method as an available action, such as a robot's coordinate versus its movement command.",
    frontend: {
      en: "Distinguish an object's stored property from the operations it can perform.",
    },
  },
});
