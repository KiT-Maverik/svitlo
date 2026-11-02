import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const traceProgramState_Skill_Data = buildSkillConfig({
  slug: "traceProgramState",
  id: "5267e1c5-bc2f-4600-b8a8-e86b9fc10fe1",
  name: {
    en: "Trace Program State",
  },
  description: {
    methodological: "Calculate intermediate values of variables, objects, and execution position across several commands; use a trace table to record when state changes. The final output may conceal those intermediate changes.",
    frontend: {
      en: "Follow changes to variables and other values while a program runs.",
    },
  },
});
