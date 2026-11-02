import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const updateProgramState_Skill_Data = buildSkillConfig({
  slug: "updateProgramState",
  id: "adf4ab00-71f5-4bfc-b2ea-0b2a81b39b59",
  name: {
    en: "Update Program State",
  },
  description: {
    methodological: "Compute and store a new state from the previous one, such as incrementing a counter after an event. Unlike simply reading a variable, changing state affects subsequent operations.",
    frontend: {
      en: "Change a program's stored state based on what happened before.",
    },
  },
});
