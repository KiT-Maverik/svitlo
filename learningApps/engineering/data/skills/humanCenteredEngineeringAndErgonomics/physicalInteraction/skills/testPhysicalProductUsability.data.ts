import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testPhysicalProductUsability_Skill_Data = buildSkillConfig({
  slug: "testPhysicalProductUsability",
  id: "9711cd92-d232-4cce-82ab-91b7f62dbc34",
  name: {
    en: "Test physical product usability",
  },
  description: {
    methodological: "Observe representative tasks and record whether operation meets defined requirements.",
    frontend: {
      en: "Observe people completing real tasks with a physical prototype.",
    },
  },
});
