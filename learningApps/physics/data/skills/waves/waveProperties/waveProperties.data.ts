import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareWaveFrequenciesByObservableRhythm_Skill_Data, distinguishSourceOscillationFromWavePropagation_Skill_Data, distinguishWaveEnergyTransferFromMatterTransport_Skill_Data, explainWaveAmplitude_Skill_Data, explainWavelength_Skill_Data, explainWaveSpeed_Skill_Data } from './skills';

export const waveProperties_SkillGroup_Data = buildSkillGroupConfig({
  slug: "waveProperties",
  id: "c4d818f6-530c-452d-b3ee-8c6614c4ba70",
  name: {
    en: "Wave Properties",
  },
  skills: {
    compareWaveFrequenciesByObservableRhythm: compareWaveFrequenciesByObservableRhythm_Skill_Data,
    distinguishSourceOscillationFromWavePropagation: distinguishSourceOscillationFromWavePropagation_Skill_Data,
    distinguishWaveEnergyTransferFromMatterTransport: distinguishWaveEnergyTransferFromMatterTransport_Skill_Data,
    explainWaveAmplitude: explainWaveAmplitude_Skill_Data,
    explainWavelength: explainWavelength_Skill_Data,
    explainWaveSpeed: explainWaveSpeed_Skill_Data,
  },
  description: {
    methodological: "Waves have a direction of propagation, a characteristic rhythm, and a disturbance magnitude; observing water waves distinguishes wave propagation from transport of all the water.",
    frontend: {
      en: "Discover how waves propagate and how their properties are measured.",
    },
  },
});
