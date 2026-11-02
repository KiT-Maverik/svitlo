import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const massFraction_Skill_Data = buildSkillConfig({
  slug: "massFraction",
  id: "2fc283e4-1452-456b-b79a-bbd4034315d3",
  name: {
    en: "Mass Fraction",
  },
  description: {
    methodological: "Relate solute mass to total solution mass rather than to solvent mass.",
    frontend: {
      en: "Understand mass fraction as the solute's share of the whole solution's mass.",
    },
  },
});
