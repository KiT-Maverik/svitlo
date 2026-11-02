import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyRelevantMaterialProperties_Skill_Data = buildSkillConfig({
  slug: "identifyRelevantMaterialProperties",
  id: "3bb55518-952c-4642-86b9-b7a3b3574a26",
  name: {
    en: "Identify relevant material properties",
  },
  description: {
    methodological: "Determine whether toughness, strength, stiffness, conductivity, transparency or mass matters in a specified application.",
    frontend: {
      en: "Choose the material properties that matter for a specific application.",
    },
  },
});
