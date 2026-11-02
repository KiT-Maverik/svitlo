import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { detectVibrationsOfASoundSource_Skill_Data, recognizeOscillatoryMotion_Skill_Data, recognizeThePeriodicityOfOscillations_Skill_Data, relateSoundToVibration_Skill_Data } from './skills';

export const oscillations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "oscillations",
  id: "b8ff6d72-4de9-4a0b-a58c-f24de25acc44",
  name: {
    en: "Oscillations",
  },
  skills: {
    detectVibrationsOfASoundSource: detectVibrationsOfASoundSource_Skill_Data,
    recognizeOscillatoryMotion: recognizeOscillatoryMotion_Skill_Data,
    recognizeThePeriodicityOfOscillations: recognizeThePeriodicityOfOscillations_Skill_Data,
    relateSoundToVibration: relateSoundToVibration_Skill_Data,
  },
  description: {
    methodological: "Repetitive motion around a given state allows vibration, periodicity, and sound sources to be described.",
    frontend: {
      en: "Learn how repeating motion creates oscillations and sound sources.",
    },
  },
});
