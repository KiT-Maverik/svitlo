import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const giniCoefficient_Skill_Data = buildSkillConfig({
  slug: "giniCoefficient",
  id: "548e864e-980f-4d9a-9f9c-f6d4f4fe6f78",
  name: {
    en: "Коефіцієнт Джині",
  },
  description: {
    methodological: "Interpret a summary index of inequality and its limits in describing the shape of a distribution.",
    frontend: {
      en: "Read a Gini coefficient without assuming it tells the whole story.",
    },
  },
});
