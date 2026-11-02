import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateCompoundLogicalExpressions_Skill_Data = buildSkillConfig({
  slug: "evaluateCompoundLogicalExpressions",
  id: "2c1b6f46-ded9-4367-9e31-8a3fa8fbfb13",
  name: {
    en: "Evaluate Compound Logical Expressions",
  },
  description: {
    methodological: "Compute expressions involving multiple conditions and AND, OR, and NOT while observing parentheses and operator precedence. For example, distinguish `(A OR B) AND C` from `A OR (B AND C)` for the same inputs.",
    frontend: {
      en: "Evaluate logical expressions with several operators in the right order.",
    },
  },
});
