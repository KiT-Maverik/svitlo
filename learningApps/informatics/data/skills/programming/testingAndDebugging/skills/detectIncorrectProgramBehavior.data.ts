import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectIncorrectProgramBehavior_Skill_Data = buildSkillConfig({
  slug: "detectIncorrectProgramBehavior",
  id: "33da9c77-a33b-40f4-a2c5-c458623184b3",
  name: {
    en: "Detect Incorrect Program Behavior",
  },
  description: {
    methodological: "Compare actual results or responses with requirements and identify a specific deviation such as a wrong value, missing response, or crash. An incorrect result need not be a runtime error; finding its root cause is a separate skill.",
    frontend: {
      en: "Recognize when a program's behavior differs from its requirements.",
    },
  },
});
