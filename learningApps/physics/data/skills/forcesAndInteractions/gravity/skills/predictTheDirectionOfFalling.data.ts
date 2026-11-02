import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictTheDirectionOfFalling_Skill_Data = buildSkillConfig({
  slug: "predictTheDirectionOfFalling",
  id: "c48dcef6-f1fc-494a-a286-dee359af15cb",
  name: {
    en: "Predict the direction of falling",
  },
  description: {
    methodological: "Near Earth's surface, gravity acts approximately toward Earth's center, so a body in free fall accelerates downward relative to the local vertical.",
    frontend: {
      en: "Predict the direction in which gravity accelerates a freely falling object.",
    },
  },
});
