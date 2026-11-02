import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpreter_Skill_Data = buildSkillConfig({
  slug: "interpreter",
  id: "af456477-e1d7-411c-8864-f38ba3eb93ce",
  name: {
    en: "Interpreter",
  },
  description: {
    methodological: "Represent the rules of a small domain-specific language as an expression structure with defined interpretation behavior.",
    frontend: {
      en: "Interpret a small language using rules represented as expressions.",
    },
  },
});
