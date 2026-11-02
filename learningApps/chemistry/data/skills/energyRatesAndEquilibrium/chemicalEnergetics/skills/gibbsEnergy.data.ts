import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const gibbsEnergy_Skill_Data = buildSkillConfig({
  slug: "gibbsEnergy",
  id: "9007dc88-e77d-415c-9f00-0c90e217b296",
  name: {
    en: "Gibbs Energy",
  },
  description: {
    methodological: "Relate enthalpy, temperature and entropy to the direction of spontaneous change at constant temperature and pressure.",
    frontend: {
      en: "Use Gibbs energy to judge when a chemical change is favorable under stated conditions.",
    },
  },
});
