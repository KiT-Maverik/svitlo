import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyLogicalOR_Skill_Data = buildSkillConfig({
  slug: "applyLogicalOR",
  id: "fb5630e7-fde7-4a97-8f21-97179a6c965e",
  name: {
    en: "Apply Logical OR",
  },
  description: {
    methodological: "Evaluate the disjunction of two conditions: it is true when at least one condition holds, including when both hold. For example, a discount may be available with a student ID or a promotional code; this is inclusive OR unless otherwise specified.",
    frontend: {
      en: "Use OR to check whether at least one of two conditions is satisfied.",
    },
  },
});
