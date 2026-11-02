import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const molecularPolarity_Skill_Data = buildSkillConfig({
  slug: "molecularPolarity",
  id: "8033aa47-bff2-4ff5-aafc-8873784b6d8a",
  name: {
    en: "Molecular Polarity",
  },
  description: {
    methodological: "Combine bond polarities with geometry to infer whether a molecule has a net dipole.",
    frontend: {
      en: "Combine bond polarity and molecular shape to understand overall molecular polarity.",
    },
  },
});
