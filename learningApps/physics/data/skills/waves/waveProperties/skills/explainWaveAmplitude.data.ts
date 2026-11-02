import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainWaveAmplitude_Skill_Data = buildSkillConfig({
  slug: "explainWaveAmplitude",
  id: "b37aea45-1cf2-462e-aa89-c90381baf5b6",
  name: {
    en: "Explain wave amplitude",
  },
  description: {
    methodological: "Amplitude is the greatest deviation of a physical quantity from its equilibrium value, not the wave's frequency.",
    frontend: {
      en: "Understand amplitude as the largest deviation from an equilibrium state.",
    },
  },
});
