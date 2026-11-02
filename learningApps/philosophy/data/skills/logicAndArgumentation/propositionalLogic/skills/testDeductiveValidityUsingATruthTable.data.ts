import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testDeductiveValidityUsingATruthTable_Skill_Data = buildSkillConfig({
  slug: "testDeductiveValidityUsingATruthTable",
  id: "ebc763c6-1122-4e03-b6d4-7346ca1796bb",
  name: {
    en: "Test deductive validity using a truth table",
  },
  description: {
    methodological: "Search for a case in which all premises are true but the conclusion false to determine propositional validity.",
    frontend: {
      en: "Check a deduction by searching for true premises with a false conclusion.",
    },
  },
});
