import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyElectricallyConductiveMaterials_Skill_Data = buildSkillConfig({
  slug: "identifyElectricallyConductiveMaterials",
  id: "360c4731-5926-435c-adf8-3661f66b0838",
  name: {
    en: "Identify electrically conductive materials",
  },
  description: {
    methodological: "Determine experimentally which materials complete a low-voltage circuit.",
    frontend: {
      en: "Test which materials conduct electricity using a safe low-voltage circuit.",
    },
  },
});
