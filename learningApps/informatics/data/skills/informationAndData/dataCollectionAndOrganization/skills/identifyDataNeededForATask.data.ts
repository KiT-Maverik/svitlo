import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyDataNeededForATask_Skill_Data = buildSkillConfig({
  slug: "identifyDataNeededForATask",
  id: "3275d16b-cdaf-4b7e-9e8d-3d1fc1d62a65",
  name: {
    en: "Identify Data Needed for a Task",
  },
  description: {
    methodological: "Determine which fields, observations, or measurements are necessary to answer a question and which do not affect the conclusion. Do not collect personal information merely because it can be stored.",
    frontend: {
      en: "Decide which fields and observations a question actually requires.",
    },
  },
});
