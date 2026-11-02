import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const templateMethod_Skill_Data = buildSkillConfig({
  slug: "templateMethod",
  id: "bbbfce51-ab9b-49d0-960f-204134b75b00",
  name: {
    en: "Template Method",
  },
  description: {
    methodological: "Define an algorithm skeleton with fixed steps while subclasses implement selected details through specified extension points.",
    frontend: {
      en: "Keep an algorithm's main steps fixed while allowing selected steps to vary.",
    },
  },
});
