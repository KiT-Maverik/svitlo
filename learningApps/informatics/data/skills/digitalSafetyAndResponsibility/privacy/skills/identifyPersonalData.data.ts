import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyPersonalData_Skill_Data = buildSkillConfig({
  slug: "identifyPersonalData",
  id: "cadaea6e-bd81-441e-82f3-73389d1373bf",
  name: {
    en: "Identify Personal Data",
  },
  description: {
    methodological: "Recognize information that identifies a person directly or in combination: name with address, photograph, contact details, or location. Even a seemingly harmless fact may be personal in context.",
    frontend: {
      en: "Recognize information that can identify a person, even when combined with other details.",
    },
  },
});
