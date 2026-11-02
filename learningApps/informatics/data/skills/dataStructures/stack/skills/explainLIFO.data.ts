import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainLIFO_Skill_Data = buildSkillConfig({
  slug: "explainLIFO",
  id: "977eed9c-94bd-46ca-a759-1fb3b1114bf1",
  name: {
    en: "Explain LIFO",
  },
  description: {
    methodological: "In a stack, the most recently added element is removed first, like the top plate in a pile; this does not mean sorting by value.",
    frontend: {
      en: "Understand why a stack returns the latest added item first.",
    },
  },
});
