import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const defineAFunctionWithParameters_Skill_Data = buildSkillConfig({
  slug: "defineAFunctionWithParameters",
  id: "b19954db-a639-446f-8031-f0af7d93aade",
  name: {
    en: "Define a Function with Parameters",
  },
  description: {
    methodological: "Create a function whose input parameters represent values used inside its body rather than hard-coding a single example.",
    frontend: {
      en: "Write a function that accepts parameters rather than fixed example values.",
    },
  },
});
