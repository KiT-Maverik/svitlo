import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const acidStrength_Skill_Data = buildSkillConfig({
  slug: "acidStrength",
  id: "e1080b0a-6222-47fb-a3da-bfa4c98f5493",
  name: {
    en: "Acid Strength",
  },
  description: {
    methodological: "Describe how strongly an acid tends to donate a proton under specified conditions. A stronger acid transfers protons more readily in a comparable system; this does not mean the solution is necessarily more concentrated or more hazardous.",
    frontend: {
      en: "Distinguish an acid's strength from how concentrated or hazardous its solution is.",
    },
  },
});
