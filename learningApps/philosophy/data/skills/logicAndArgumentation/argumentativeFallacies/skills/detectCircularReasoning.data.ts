import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectCircularReasoning_Skill_Data = buildSkillConfig({
  slug: "detectCircularReasoning",
  id: "53966a3d-61b6-424f-9218-b22ebc55af6f",
  name: {
    en: "Detect circular reasoning",
  },
  description: {
    methodological: "Recognize when the offered support presupposes the very claim at issue without independent justification.",
    frontend: {
      en: "Recognize arguments that assume the conclusion they claim to prove.",
    },
  },
});
