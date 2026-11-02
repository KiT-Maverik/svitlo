import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const designRepetition_Skill_Data = buildSkillConfig({
  slug: "designRepetition",
  id: "f3e6d410-108b-46b7-bdf3-29aac565ed46",
  name: {
    en: "Design Repetition",
  },
  description: {
    methodological: "Define the body of a repeated procedure, its continuation or termination condition, and state changes between steps. This prevents infinite loops and distinguishes repetition from copying identical instructions.",
    frontend: {
      en: "Design a repeated procedure with correct updates and a stopping condition.",
    },
  },
});
