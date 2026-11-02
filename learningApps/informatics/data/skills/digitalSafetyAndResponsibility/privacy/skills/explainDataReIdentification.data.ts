import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainDataReIdentification_Skill_Data = buildSkillConfig({
  slug: "explainDataReIdentification",
  id: "0ed0ddb2-1ef9-4fbc-bb0a-aad4ae45dbf8",
  name: {
    en: "Explain Data Re-identification",
  },
  description: {
    methodological: "Explain how supposedly anonymized records can sometimes be linked to a person through external clues, such as habitual routes and times.",
    frontend: {
      en: "Explain how separately collected details can identify a person again.",
    },
  },
});
