import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizePeriodicMotion_Skill_Data = buildSkillConfig({
  slug: "recognizePeriodicMotion",
  id: "c36a7728-a266-4a9d-9b71-03a9e2bd129f",
  name: {
    en: "Recognize periodic motion",
  },
  description: {
    methodological: "Identify recurring physical states and distinguish regular cycles of motion from random or one-time changes in position.",
    frontend: {
      en: "Recognize motion that repeats in a regular cycle.",
    },
  },
});
