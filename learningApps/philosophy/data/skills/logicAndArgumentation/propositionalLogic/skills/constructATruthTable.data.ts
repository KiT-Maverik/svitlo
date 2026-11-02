import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const constructATruthTable_Skill_Data = buildSkillConfig({
  slug: "constructATruthTable",
  id: "f4321517-f51f-41fa-bc24-a3829bdfb21c",
  name: {
    en: "Construct a truth table",
  },
  description: {
    methodological: "Enumerate truth-value combinations for atomic propositions and systematically compute outcomes of logical expressions.",
    frontend: {
      en: "Construct a table of possible truth assignments for a logical expression.",
    },
  },
});
