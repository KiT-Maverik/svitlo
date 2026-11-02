import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectVibrationsOfASoundSource_Skill_Data = buildSkillConfig({
  slug: "detectVibrationsOfASoundSource",
  id: "50ff0729-b6a4-42cd-8820-c0e3caba43e8",
  name: {
    en: "Detect vibrations of a sound source",
  },
  description: {
    methodological: "Identify the oscillating part of a system that generates a sound disturbance, as distinct from components that merely transmit vibration onward.",
    frontend: {
      en: "Identify the part of an object that actually vibrates to create sound.",
    },
  },
});
