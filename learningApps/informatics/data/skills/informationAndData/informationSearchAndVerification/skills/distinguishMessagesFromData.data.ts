import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishMessagesFromData_Skill_Data = buildSkillConfig({
  slug: "distinguishMessagesFromData",
  id: "46aeedfa-5976-449d-89c3-97901d99b779",
  name: {
    en: "Distinguish Messages from Data",
  },
  description: {
    methodological: "Differentiate individually recorded values from a message that conveys meaning to an audience in context. For example, the number '18' communicates a temperature only once the unit and measured object are supplied.",
    frontend: {
      en: "Distinguish a recorded value from the meaning a message gives it.",
    },
  },
});
