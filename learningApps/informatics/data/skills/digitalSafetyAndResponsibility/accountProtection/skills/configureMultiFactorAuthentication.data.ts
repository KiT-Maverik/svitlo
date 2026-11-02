import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const configureMultiFactorAuthentication_Skill_Data = buildSkillConfig({
  slug: "configureMultiFactorAuthentication",
  id: "fba32eb8-3602-4dc5-b496-1354721f8b7a",
  name: {
    en: "Configure Multi-Factor Authentication",
  },
  description: {
    methodological: "In a safe practice or personal environment, choose and activate a supported additional factor and plan account recovery. Distinguish configuring protection from merely explaining it; never require disclosure of secret codes.",
    frontend: {
      en: "Set up an additional sign-in factor and plan how to recover access safely.",
    },
  },
});
