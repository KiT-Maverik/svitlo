import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const command_Skill_Data = buildSkillConfig({
  slug: "command",
  id: "0eac5920-8305-49ab-82a9-af32a37f6203",
  name: {
    en: "Command",
  },
  description: {
    methodological: "Represent an action as a request object that can be stored, queued, or executed later.",
    frontend: {
      en: "Represent an operation as an object that can be stored or scheduled.",
    },
  },
});
