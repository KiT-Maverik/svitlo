import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { habitCues_Skill_Data, habitDisruption_Skill_Data, habitFormation_Skill_Data, habitSubstitution_Skill_Data } from './skills';

export const habitMechanisms_SkillGroup_Data = buildSkillGroupConfig({
  slug: "habitMechanisms",
  id: "5c10bf19-b012-41dc-90a3-e9a970b3faba",
  name: {
    en: "Habit Mechanisms",
  },
  skills: {
    habitCues: habitCues_Skill_Data,
    habitDisruption: habitDisruption_Skill_Data,
    habitFormation: habitFormation_Skill_Data,
    habitSubstitution: habitSubstitution_Skill_Data,
  },
  description: {
    methodological: "Repeated actions become cue-sensitive routines that can operate with reduced deliberation, though habits remain dependent on context.",
    frontend: {
      en: "Discover how repeated actions become cues and habits.",
    },
  },
});
