import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishPredicatesFromPropositions_Skill_Data = buildSkillConfig({
  slug: "distinguishPredicatesFromPropositions",
  id: "eb8c4b87-96ef-42cf-83d6-c5c4d7b03dd5",
  name: {
    en: "Distinguish predicates from propositions",
  },
  description: {
    methodological: "Recognize a predicate with an unbound variable as an open expression and a proposition as a statement with specified truth conditions.",
    frontend: {
      en: "Distinguish an open expression about a variable from a complete proposition.",
    },
  },
});
