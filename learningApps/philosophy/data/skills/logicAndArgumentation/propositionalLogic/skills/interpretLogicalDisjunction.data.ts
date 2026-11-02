import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretLogicalDisjunction_Skill_Data = buildSkillConfig({
  slug: "interpretLogicalDisjunction",
  id: "8012a338-ff1e-4e4e-ad9b-fb11fa60055c",
  name: {
    en: "Interpret logical disjunction",
  },
  description: {
    methodological: "Apply the truth conditions of inclusive 'or' and distinguish these from interpretations that require exactly one alternative.",
    frontend: {
      en: "Interpret inclusive OR without assuming only one option can be true.",
    },
  },
});
