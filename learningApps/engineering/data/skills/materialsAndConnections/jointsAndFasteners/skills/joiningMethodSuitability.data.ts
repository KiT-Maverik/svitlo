import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const joiningMethodSuitability_Skill_Data = buildSkillConfig({
  slug: "joiningMethodSuitability",
  id: "6395ec68-5406-40f8-b957-bacefb83099f",
  name: {
    en: "Joining-method suitability",
  },
  description: {
    methodological: "Assess whether detachable, bonded, welded or magnetic joints can transfer loads, provide access and support maintenance. Choosing one particular screw or glue is a task variant.",
    frontend: {
      en: "Compare joining methods by strength, accessibility and maintenance.",
    },
  },
});
