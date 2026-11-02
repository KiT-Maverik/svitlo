import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictTheRotationOfMeshedGears_Skill_Data = buildSkillConfig({
  slug: "predictTheRotationOfMeshedGears",
  id: "c750d2e9-3c4f-4e61-a019-958b9bd246f0",
  name: {
    en: "Predict the rotation of meshed gears",
  },
  description: {
    methodological: "A directly meshed pair of gears rotates in opposite directions, and the ratio of their angular velocities depends on the number of teeth.",
    frontend: {
      en: "Predict how interlocking gears rotate and how their tooth counts affect speed.",
    },
  },
});
