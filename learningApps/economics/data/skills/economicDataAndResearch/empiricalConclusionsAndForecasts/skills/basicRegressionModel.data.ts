import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const basicRegressionModel_Skill_Data = buildSkillConfig({
  slug: "basicRegressionModel",
  id: "af2aa3be-a5bb-4c32-a323-c92c292dd76f",
  name: {
    en: "Базова регресійна модель",
  },
  description: {
    methodological: "Interpret an estimated relationship between an outcome and explanatory variables without automatically attributing a causal meaning to coefficients.",
    frontend: {
      en: "Read the relationships described by a simple regression model.",
    },
  },
});
