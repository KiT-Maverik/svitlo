import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { detectIncorrectProgramBehavior_Skill_Data, fixAProgramDefect_Skill_Data, locateTheCauseOfAnError_Skill_Data, testAProgramWithDifferentInputs_Skill_Data } from './skills';

export const testingAndDebugging_SkillGroup_Data = buildSkillGroupConfig({
  slug: "testingAndDebugging",
  id: "76829708-e899-494d-bb99-65cd18b04a4c",
  name: {
    en: "Testing and Debugging",
  },
  skills: {
    detectIncorrectProgramBehavior: detectIncorrectProgramBehavior_Skill_Data,
    fixAProgramDefect: fixAProgramDefect_Skill_Data,
    locateTheCauseOfAnError: locateTheCauseOfAnError_Skill_Data,
    testAProgramWithDifferentInputs: testAProgramWithDifferentInputs_Skill_Data,
  },
  description: {
    methodological: "Compare actual program behavior with requirements, find the cause of deviations, correct them, and test again. Detecting a defect, diagnosing it, changing code, and testing multiple cases are distinct abilities.",
    frontend: {
      en: "Discover how to find, explain and correct mistakes in programs.",
    },
  },
});
