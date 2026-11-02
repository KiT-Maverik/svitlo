import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { updateProgramState_Skill_Data, useAVariable_Skill_Data, useInputData_Skill_Data } from './skills';

export const programData_SkillGroup_Data = buildSkillGroupConfig({
  slug: "programData",
  id: "84fdc531-f135-4915-a216-3ccfdc6414e6",
  name: {
    en: "Program Data",
  },
  skills: {
    updateProgramState: updateProgramState_Skill_Data,
    useAVariable: useAVariable_Skill_Data,
    useInputData: useInputData_Skill_Data,
  },
  description: {
    methodological: "Working with values received, stored, and changed at runtime: variables, types, inputs, and state transitions. This concerns data during code execution rather than external datasets for statistical analysis.",
    frontend: {
      en: "Work with the values and changing state used by a running program.",
    },
  },
});
