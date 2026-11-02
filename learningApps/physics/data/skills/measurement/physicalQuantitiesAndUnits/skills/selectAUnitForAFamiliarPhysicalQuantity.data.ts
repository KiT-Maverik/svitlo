import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const selectAUnitForAFamiliarPhysicalQuantity_Skill_Data = buildSkillConfig({
  slug: "selectAUnitForAFamiliarPhysicalQuantity",
  id: "8d55cdc8-7c97-4574-91e2-77e596b0db24",
  name: {
    en: "Select a unit for a familiar physical quantity",
  },
  description: {
    methodological: "Choose appropriate units of time, length, and mass in everyday examples without confusing a physical quantity with an object.",
    frontend: {
      en: "Choose meaningful measurement units for time, mass and length.",
    },
  },
});
