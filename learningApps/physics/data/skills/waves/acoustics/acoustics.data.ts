import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareTheLoudnessOfSounds_Skill_Data, distinguishHighPitchedFromLowPitchedSounds_Skill_Data, explainAnEchoAsSoundReflection_Skill_Data, explainHowSoundLoudnessDependsOnOscillationAmplitude_Skill_Data, explainHowSoundPitchDependsOnOscillationFrequency_Skill_Data, explainSoundAttenuationWithDistance_Skill_Data, explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener_Skill_Data, recognizeSoundTransmissionThroughAMedium_Skill_Data } from './skills';

export const acoustics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "acoustics",
  id: "7ad407f0-8bcf-4aff-b77b-d2a0c34f01e4",
  name: {
    en: "Acoustics",
  },
  skills: {
    compareTheLoudnessOfSounds: compareTheLoudnessOfSounds_Skill_Data,
    distinguishHighPitchedFromLowPitchedSounds: distinguishHighPitchedFromLowPitchedSounds_Skill_Data,
    explainAnEchoAsSoundReflection: explainAnEchoAsSoundReflection_Skill_Data,
    explainHowSoundLoudnessDependsOnOscillationAmplitude: explainHowSoundLoudnessDependsOnOscillationAmplitude_Skill_Data,
    explainHowSoundPitchDependsOnOscillationFrequency: explainHowSoundPitchDependsOnOscillationFrequency_Skill_Data,
    explainSoundAttenuationWithDistance: explainSoundAttenuationWithDistance_Skill_Data,
    explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener: explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener_Skill_Data,
    recognizeSoundTransmissionThroughAMedium: recognizeSoundTransmissionThroughAMedium_Skill_Data,
  },
  description: {
    methodological: "Loudness, pitch, and the propagation of sound through a medium are related to oscillation properties; auditory experiences can be explored with safe simulations.",
    frontend: {
      en: "Explore how vibration and sound propagation affect what we hear.",
    },
  },
});
