import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const handleAnEvent_Skill_Data = buildSkillConfig({
  slug: "handleAnEvent",
  id: "743d70ec-ac08-4f97-aac9-5845e1c2f346",
  name: {
    en: "Handle an Event",
  },
  description: {
    methodological: "Associate a programmed response with a signal such as a button press, message, or state change, distinguishing the event's arrival from execution of its handler. This is not simply a condition checked sequentially at every step.",
    frontend: {
      en: "Make a program respond when a button, message or another event occurs.",
    },
  },
});
