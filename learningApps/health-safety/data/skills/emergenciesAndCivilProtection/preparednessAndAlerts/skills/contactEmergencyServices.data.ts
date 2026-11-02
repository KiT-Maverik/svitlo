import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const contactEmergencyServices_Skill_Data = buildSkillConfig({
  slug: "contactEmergencyServices",
  id: "a2851cfd-2b80-4271-a3a6-e8686f585bc4",
  name: {
    en: "Contact emergency services",
  },
  description: {
    methodological: "Communicate location, type of emergency, persons affected and critical changes clearly, including during medical first aid, while following dispatcher instructions and ensuring the caller's own safety.",
    frontend: {
      en: "Explain an emergency clearly to dispatchers while following their instructions.",
    },
  },
});
