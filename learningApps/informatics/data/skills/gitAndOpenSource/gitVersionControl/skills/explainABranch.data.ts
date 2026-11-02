import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainABranch_Skill_Data = buildSkillConfig({
  slug: "explainABranch",
  id: "ab492aa2-5a99-48e2-a444-47a15abb3ccd",
  name: {
    en: "Explain a Branch",
  },
  description: {
    methodological: "A branch represents a line of development on which commits can be created without immediately changing the main history.",
    frontend: {
      en: "Understand how branches let developers work on separate lines of change.",
    },
  },
});
