import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const handHygiene_Skill_Data = buildSkillConfig({
  slug: "handHygiene",
  id: "456a5d69-5a03-44b3-acff-eb9d42afea7f",
  name: {
    en: "Hand hygiene",
  },
  description: {
    methodological: "Use washing or an appropriate hand sanitizer at meaningful moments, paying attention to coverage and the circumstances in which soap and water are needed.",
    frontend: {
      en: "Recognize when to clean your hands and how to do it effectively.",
    },
  },
});
