import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const molarMass_Skill_Data = buildSkillConfig({
  slug: "molarMass",
  id: "5bc28cd2-056a-4bdf-856a-1ef79763ba62",
  name: {
    en: "Molar Mass",
  },
  description: {
    methodological: "Connect formula composition to mass per mole using atomic masses.",
    frontend: {
      en: "Use molar mass to relate a chemical formula to the mass of a mole.",
    },
  },
});
