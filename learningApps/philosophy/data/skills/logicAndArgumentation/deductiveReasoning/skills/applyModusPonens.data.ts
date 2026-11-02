import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyModusPonens_Skill_Data = buildSkillConfig({
  slug: "applyModusPonens",
  id: "ad886630-f7ee-456d-a8a8-db01f9caaa80",
  name: {
    en: "Apply modus ponens",
  },
  description: {
    methodological: "Infer a consequent from a conditional and its antecedent without treating the inverse conditional as equivalent.",
    frontend: {
      en: "Apply the rule that if A implies B and A holds, then B follows.",
    },
  },
});
