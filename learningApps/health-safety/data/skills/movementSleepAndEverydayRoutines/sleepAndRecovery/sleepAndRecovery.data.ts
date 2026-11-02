import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { recognizeProblematicSleepPatterns_Skill_Data, supportHealthySleepRoutines_Skill_Data, understandSleepNeeds_Skill_Data } from './skills';

export const sleepAndRecovery_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sleepAndRecovery",
  id: "5707083d-71c1-40f2-ab26-0f9440208252",
  name: {
    en: "Sleep and Recovery",
  },
  skills: {
    recognizeProblematicSleepPatterns: recognizeProblematicSleepPatterns_Skill_Data,
    supportHealthySleepRoutines: supportHealthySleepRoutines_Skill_Data,
    understandSleepNeeds: understandSleepNeeds_Skill_Data,
  },
  description: {
    methodological: "Sleep quality is affected by timing, environment, individual needs, and habits; persistent difficulty may warrant professional attention.",
    frontend: {
      en: "Explore how sleep and regular rest affect everyday functioning.",
    },
  },
});
