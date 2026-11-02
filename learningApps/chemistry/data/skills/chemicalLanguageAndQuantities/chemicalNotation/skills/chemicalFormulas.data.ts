import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const chemicalFormulas_Skill_Data = buildSkillConfig({
  slug: "chemicalFormulas",
  id: "3dea936b-ee98-4a01-947c-66aeff4df8ad",
  name: {
    en: "Chemical Formulas",
  },
  description: {
    methodological: "Read subscripts as composition information rather than reaction coefficients.",
    frontend: {
      en: "Understand how formula subscripts indicate the proportions of different atoms.",
    },
  },
});
