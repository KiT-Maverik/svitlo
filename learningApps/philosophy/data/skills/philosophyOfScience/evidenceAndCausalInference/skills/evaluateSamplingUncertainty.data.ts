import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateSamplingUncertainty_Skill_Data = buildSkillConfig({
  slug: "evaluateSamplingUncertainty",
  id: "e66dc35b-8873-4711-bda0-79fc527b3d0d",
  name: {
    en: "Evaluate sampling uncertainty",
  },
  description: {
    methodological: "Assess how sample size, observed variation, and sampling processes affect the precision of an estimate, distinguishing imprecision from whether the sample represents its target population.",
    frontend: {
      en: "Explore how sampling choices and variation affect an estimate's precision.",
    },
  },
});
