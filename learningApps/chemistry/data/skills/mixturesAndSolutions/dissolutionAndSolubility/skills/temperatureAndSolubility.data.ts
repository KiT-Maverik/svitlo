import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const temperatureAndSolubility_Skill_Data = buildSkillConfig({
  slug: "temperatureAndSolubility",
  id: "2bc58c08-28f4-4d45-b7db-bcc7b981a18e",
  name: {
    en: "Temperature and Solubility",
  },
  description: {
    methodological: "Recognize that temperature affects dissolution equilibria differently for different solute–solvent systems.",
    frontend: {
      en: "Explore why temperature can change how much of a substance dissolves.",
    },
  },
});
