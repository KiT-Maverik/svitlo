import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const measurementUncertainty_Skill_Data = buildSkillConfig({
  slug: "measurementUncertainty",
  id: "a24fcfe5-91bd-4c96-a7dd-e04c21517ecb",
  name: {
    en: "Measurement Uncertainty",
  },
  description: {
    methodological: "Interpret the precision and uncertainty of experimental measurements rather than treating every reported digit as exact.",
    frontend: {
      en: "Understand why measured values have uncertainty rather than perfect precision.",
    },
  },
});
