import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictTheEffectOfCenterOfMassPositionOnStability_Skill_Data = buildSkillConfig({
  slug: "predictTheEffectOfCenterOfMassPositionOnStability",
  id: "6213d294-8d95-4def-85e7-2e29d9be0bda",
  name: {
    en: "Predict the effect of center-of-mass position on stability",
  },
  description: {
    methodological: "The position of the center of mass relative to the support area affects whether a body can overturn under gravity.",
    frontend: {
      en: "Predict when the center of mass makes an object more likely to tip.",
    },
  },
});
