import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const memento_Skill_Data = buildSkillConfig({
  slug: "memento",
  id: "4b1f7c11-8b1b-4995-823a-d960d2b16bfb",
  name: {
    en: "Memento",
  },
  description: {
    methodological: "Save an external snapshot that allows restoring an object's state without revealing its internal implementation.",
    frontend: {
      en: "Save an object's state so it can later be restored.",
    },
  },
});
