import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictTheEffectOfASwitchInACircuit_Skill_Data = buildSkillConfig({
  slug: "predictTheEffectOfASwitchInACircuit",
  id: "e3b3291c-f917-4fb9-a52c-75998ca04469",
  name: {
    en: "Predict the effect of a switch in a circuit",
  },
  description: {
    methodological: "The consequences of switching depend on where the switch is placed relative to the source, loads, and parallel paths.",
    frontend: {
      en: "Predict which circuit parts a switch will turn on or off.",
    },
  },
});
