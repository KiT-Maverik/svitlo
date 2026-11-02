import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const prototype_Skill_Data = buildSkillConfig({
  slug: "prototype",
  id: "a3fbd495-5b5b-4032-baaa-11e9f23de2b0",
  name: {
    en: "Prototype",
  },
  description: {
    methodological: "Create a new object by copying a configured exemplar, considering shared nested data and the new object's identity.",
    frontend: {
      en: "Create new objects by copying a configured example.",
    },
  },
});
