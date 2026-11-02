import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const protectPersonalDataInPrompts_Skill_Data = buildSkillConfig({
  slug: "protectPersonalDataInPrompts",
  id: "42bbcb35-f4d0-496b-b90c-495b08683e32",
  name: {
    en: "Protect Personal Data in Prompts",
  },
  description: {
    methodological: "Identify information about individuals that should not be disclosed to an external AI service and remove or generalize it without defeating the task objective. Public access to a model does not imply that submitted data stays private.",
    frontend: {
      en: "Remove unnecessary personal information before submitting an AI request.",
    },
  },
});
