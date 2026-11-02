import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainAnObjectMethod_Skill_Data = buildSkillConfig({
  slug: "explainAnObjectMethod",
  id: "d230cfc9-5e2d-4e31-8b24-0fe21d3c32df",
  name: {
    en: "Explain an Object Method",
  },
  description: {
    methodological: "Show how invoking an object operation reads or changes its state; a method definition does not mean the operation has already run.",
    frontend: {
      en: "Explain how calling a method can read or change an object's state.",
    },
  },
});
