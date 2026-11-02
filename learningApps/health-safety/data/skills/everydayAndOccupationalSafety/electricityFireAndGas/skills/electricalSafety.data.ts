import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const electricalSafety_Skill_Data = buildSkillConfig({
  slug: "electricalSafety",
  id: "b03a43ca-ef42-4240-ba00-55d0b0198a58",
  name: {
    en: "Electrical safety",
  },
  description: {
    methodological: "Recognize damaged wiring, water-related hazards, overloaded circuits, and the limits of safe user action.",
    frontend: {
      en: "Identify dangerous wiring and know when not to touch it.",
    },
  },
});
