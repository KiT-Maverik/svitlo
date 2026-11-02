import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareCollectionInsertionCosts_Skill_Data = buildSkillConfig({
  slug: "compareCollectionInsertionCosts",
  id: "8cd40212-cd6f-436b-824b-01d8fc5df9a7",
  name: {
    en: "Compare Collection Insertion Costs",
  },
  description: {
    methodological: "Explain why an array may require moving elements while a linked list may require changing links, although the insertion point still needs to be located.",
    frontend: {
      en: "Explore why insertion can require shifting array elements or changing links.",
    },
  },
});
