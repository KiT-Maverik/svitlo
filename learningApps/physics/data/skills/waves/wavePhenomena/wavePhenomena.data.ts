import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainResonance_Skill_Data, explainWaveDiffraction_Skill_Data, explainWaveInterference_Skill_Data, explainWaveReflection_Skill_Data, explainWaveRefraction_Skill_Data } from './skills';

export const wavePhenomena_SkillGroup_Data = buildSkillGroupConfig({
  slug: "wavePhenomena",
  id: "8a9c2e30-5221-42e2-9adf-84085ee72d7f",
  name: {
    en: "Wave Phenomena",
  },
  skills: {
    explainResonance: explainResonance_Skill_Data,
    explainWaveDiffraction: explainWaveDiffraction_Skill_Data,
    explainWaveInterference: explainWaveInterference_Skill_Data,
    explainWaveReflection: explainWaveReflection_Skill_Data,
    explainWaveRefraction: explainWaveRefraction_Skill_Data,
  },
  description: {
    methodological: "Reflection, refraction, interference, diffraction, and resonance can occur in different kinds of physical waves.",
    frontend: {
      en: "Discover how waves reflect, bend, overlap, spread and resonate.",
    },
  },
});
