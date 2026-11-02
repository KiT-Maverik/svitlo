import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainACommandsPurpose_Skill_Data, predictConsequencesOfExecutionOrder_Skill_Data, predictProgramOutput_Skill_Data, traceProgramState_Skill_Data } from './skills';

export const readingPrograms_SkillGroup_Data = buildSkillGroupConfig({
  slug: "readingPrograms",
  id: "3880c31f-9f35-46e2-bdf7-4049c05922c1",
  name: {
    en: "Reading Programs",
  },
  skills: {
    explainACommandsPurpose: explainACommandsPurpose_Skill_Data,
    predictConsequencesOfExecutionOrder: predictConsequencesOfExecutionOrder_Skill_Data,
    predictProgramOutput: predictProgramOutput_Skill_Data,
    traceProgramState: traceProgramState_Skill_Data,
  },
  description: {
    methodological: "Interpreting existing commands and their execution order, including intermediate state changes and final outcomes. This differs from writing new instructions or fixing an identified defect.",
    frontend: {
      en: "Discover how to read a program and follow what it does.",
    },
  },
});
