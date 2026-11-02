import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyLogicalNOT_Skill_Data = buildSkillConfig({
  slug: "applyLogicalNOT",
  id: "e6713661-58c2-496b-90d3-37c4a3b6c7ce",
  name: {
    en: "Apply Logical NOT",
  },
  description: {
    methodological: "Negate a condition's truth value: `NOT isLocked` is true when `isLocked` is false. Negation changes the truth value of the condition, not the underlying facts.",
    frontend: {
      en: "Use NOT to reverse the truth value of a condition.",
    },
  },
});
