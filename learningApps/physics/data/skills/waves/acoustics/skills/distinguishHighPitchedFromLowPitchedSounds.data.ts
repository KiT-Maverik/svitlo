import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishHighPitchedFromLowPitchedSounds_Skill_Data = buildSkillConfig({
  slug: "distinguishHighPitchedFromLowPitchedSounds",
  id: "72f5dad8-ceee-40d3-8e21-b772512a211e",
  name: {
    en: "Distinguish high-pitched from low-pitched sounds",
  },
  description: {
    methodological: "Pitch is primarily related to the frequency of sound oscillations, not amplitude, which affects intensity.",
    frontend: {
      en: "Recognize high and low pitches by the frequency of sound waves.",
    },
  },
});
