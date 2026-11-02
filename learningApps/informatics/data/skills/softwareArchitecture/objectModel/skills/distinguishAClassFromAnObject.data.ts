import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishAClassFromAnObject_Skill_Data = buildSkillConfig({
  slug: "distinguishAClassFromAnObject",
  id: "dbaf468a-1a17-4408-970a-fcc9327819b3",
  name: {
    en: "Distinguish a Class from an Object",
  },
  description: {
    methodological: "Compare a type's template with particular instances holding their own values: one Robot class can produce several robots with different coordinates. A state change in one instance need not affect the others.",
    frontend: {
      en: "Distinguish the blueprint of a class from objects with their own current values.",
    },
  },
});
