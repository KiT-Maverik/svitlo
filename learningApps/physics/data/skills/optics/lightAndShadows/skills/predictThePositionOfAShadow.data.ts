import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictThePositionOfAShadow_Skill_Data = buildSkillConfig({
  slug: "predictThePositionOfAShadow",
  id: "4d683f07-929e-484b-8382-11636191a431",
  name: {
    en: "Predict the position of a shadow",
  },
  description: {
    methodological: "Predict where a shadow forms given the positions of the source and object.",
    frontend: {
      en: "Predict which side of an object a shadow will appear on.",
    },
  },
});
