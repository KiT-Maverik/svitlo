import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeHeating_Skill_Data = buildSkillConfig({
  slug: "recognizeHeating",
  id: "2450cde5-4854-40ac-96e8-7138f35bdaa5",
  name: {
    en: "Recognize heating",
  },
  description: {
    methodological: "An increase in temperature reflects a change in thermal state, but energy input does not always increase temperature during a phase transition.",
    frontend: {
      en: "Recognize changes in thermal state during heating.",
    },
  },
});
