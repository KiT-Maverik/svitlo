import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { circadianTiming_Skill_Data, sleepAndMemory_Skill_Data, sleepDeprivationEffects_Skill_Data, sleepStages_Skill_Data } from './skills';

export const sleepAndDailyRhythms_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sleepAndDailyRhythms",
  id: "3fce520d-43ba-4158-aeef-48c54372bbb5",
  name: {
    en: "Sleep and Daily Rhythms",
  },
  skills: {
    circadianTiming: circadianTiming_Skill_Data,
    sleepAndMemory: sleepAndMemory_Skill_Data,
    sleepDeprivationEffects: sleepDeprivationEffects_Skill_Data,
    sleepStages: sleepStages_Skill_Data,
  },
  description: {
    methodological: "Circadian timing and sleep states influence subsequent cognitive functioning, distinct from clinical sleep diagnosis.",
    frontend: {
      en: "Discover how daily biological rhythms and sleep affect mental performance.",
    },
  },
});
