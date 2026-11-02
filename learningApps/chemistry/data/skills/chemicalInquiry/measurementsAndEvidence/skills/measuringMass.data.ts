import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const measuringMass_Skill_Data = buildSkillConfig({
  slug: "measuringMass",
  id: "56a1465f-e0e1-4d6f-a256-aff755541fcf",
  name: {
    en: "Measuring Mass",
  },
  description: {
    methodological: "Determine and interpret the mass of a sample, including appropriate units and the effects of container mass.",
    frontend: {
      en: "Measure the mass of a sample while accounting for its container and units.",
    },
  },
});
