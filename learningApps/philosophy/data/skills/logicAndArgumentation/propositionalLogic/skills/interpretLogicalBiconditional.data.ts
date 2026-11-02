import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretLogicalBiconditional_Skill_Data = buildSkillConfig({
  slug: "interpretLogicalBiconditional",
  id: "c419c18f-e9be-4a9b-82e7-2d50ba4f2a7c",
  name: {
    en: "Interpret logical biconditional",
  },
  description: {
    methodological: "Assess 'if and only if' statements as two-way conditional relationships, rather than treating either one-way conditional as sufficient.",
    frontend: {
      en: "Recognize that 'if and only if' requires implications in both directions.",
    },
  },
});
