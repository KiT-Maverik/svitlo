import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const dequeueAnElement_Skill_Data = buildSkillConfig({
  slug: "dequeueAnElement",
  id: "7401fef0-db89-4569-b357-23b3276b0fab",
  name: {
    en: "Dequeue an Element",
  },
  description: {
    methodological: "Remove the front element of a FIFO structure, preserving the order of the rest and handling an empty queue.",
    frontend: {
      en: "Remove the front item from a queue without disturbing the others.",
    },
  },
});
