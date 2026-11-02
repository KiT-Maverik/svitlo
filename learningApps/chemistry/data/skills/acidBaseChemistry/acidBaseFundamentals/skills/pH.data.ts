import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const pH_Skill_Data = buildSkillConfig({
  slug: "pH",
  id: "002fd049-95b6-4798-998e-9b647d0d8667",
  name: {
    en: "pH",
  },
  description: {
    methodological: "Interpret a logarithmic measure of hydrogen-ion activity and its concentration-based approximations.",
    frontend: {
      en: "Read pH as a logarithmic way to describe acidity in a solution.",
    },
  },
});
