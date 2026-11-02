import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const fixAProgramDefect_Skill_Data = buildSkillConfig({
  slug: "fixAProgramDefect",
  id: "019afb04-e61e-42de-a593-f3cbbd99a849",
  name: {
    en: "Fix a Program Defect",
  },
  description: {
    methodological: "Change the specific code or rule responsible for a confirmed defect without breaking the required behavior of other cases. Retest the original failure after making the correction.",
    frontend: {
      en: "Correct a specific defect and check that the required behavior still works.",
    },
  },
});
