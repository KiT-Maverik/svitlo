import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareSetsOfObservations_Skill_Data = buildSkillConfig({
  slug: "compareSetsOfObservations",
  id: "bdc0d418-89f0-45b2-89f0-a8c8d921c6d3",
  name: {
    en: "Compare Sets of Observations",
  },
  description: {
    methodological: "Choose a common basis for comparing two datasets—categories, ranges, or frequencies—and explain observed differences. A difference alone does not establish its cause.",
    frontend: {
      en: "Compare two datasets using the same measures or categories.",
    },
  },
});
