import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretExistentialQuantification_Skill_Data = buildSkillConfig({
  slug: "interpretExistentialQuantification",
  id: "be241204-a754-44b7-94bd-ee3afedf0eaa",
  name: {
    en: "Interpret existential quantification",
  },
  description: {
    methodological: "Determine what it means for at least one element of a specified domain to satisfy a property, without implying uniqueness.",
    frontend: {
      en: "Understand how 'there exists' means at least one matching example.",
    },
  },
});
