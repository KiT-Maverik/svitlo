import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyMineralsUsingMultipleDiagnosticProperties_Skill_Data = buildSkillConfig({
  slug: "identifyMineralsUsingMultipleDiagnosticProperties",
  id: "8b9d2c38-e561-4696-aec6-c13fd82c50ee",
  name: {
    en: "Identify minerals using multiple diagnostic properties",
  },
  description: {
    methodological: "Combine evidence from observable properties to narrow possible mineral identities, recognizing that a single shared trait such as color rarely identifies a specimen reliably.",
    frontend: {
      en: "Identify a mineral by comparing several properties instead of relying on color.",
    },
  },
});
