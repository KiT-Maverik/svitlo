import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const reactionEnthalpy_Skill_Data = buildSkillConfig({
  slug: "reactionEnthalpy",
  id: "5df513d5-6670-430f-a3ee-01c546869409",
  name: {
    en: "Reaction Enthalpy",
  },
  description: {
    methodological: "Relate heat at constant pressure to the difference in enthalpy between states.",
    frontend: {
      en: "Compare the energy before and after a reaction using its enthalpy change.",
    },
  },
});
