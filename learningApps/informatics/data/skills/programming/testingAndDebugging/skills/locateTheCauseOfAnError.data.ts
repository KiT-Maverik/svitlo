import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const locateTheCauseOfAnError_Skill_Data = buildSkillConfig({
  slug: "locateTheCauseOfAnError",
  id: "f5e6e900-34a8-4061-a708-b43ff8ab9791",
  name: {
    en: "Locate the Cause of an Error",
  },
  description: {
    methodological: "Narrow a defect to a particular instruction, condition, or state transition by tracing execution and testing hypotheses. Recognizing a wrong result does not by itself identify its cause.",
    frontend: {
      en: "Trace a programming error to the instruction or condition causing it.",
    },
  },
});
