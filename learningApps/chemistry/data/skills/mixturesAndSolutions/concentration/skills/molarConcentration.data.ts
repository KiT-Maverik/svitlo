import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const molarConcentration_Skill_Data = buildSkillConfig({
  slug: "molarConcentration",
  id: "cfd53008-a7cd-44de-88a4-47fc65767880",
  name: {
    en: "Molar Concentration",
  },
  description: {
    methodological: "Relate dissolved amount of substance to solution volume and suitable units.",
    frontend: {
      en: "Use moles per volume to describe the concentration of dissolved substances.",
    },
  },
});
