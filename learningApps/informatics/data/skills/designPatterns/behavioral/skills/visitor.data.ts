import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const visitor_Skill_Data = buildSkillConfig({
  slug: "visitor",
  id: "c7e97ed0-d899-4d2b-8093-8e669323f15d",
  name: {
    en: "Visitor",
  },
  description: {
    methodological: "Move operations on a family of types into a separate visitor while keeping the element structure relatively stable.",
    frontend: {
      en: "Separate operations from the object structures on which they act.",
    },
  },
});
