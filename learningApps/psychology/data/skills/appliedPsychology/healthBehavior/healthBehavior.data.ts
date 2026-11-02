import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adherenceToCarePlans_Skill_Data, behaviorChangeInterventions_Skill_Data, healthBeliefsAndAction_Skill_Data, socialSupportAndHealth_Skill_Data } from './skills';

export const healthBehavior_SkillGroup_Data = buildSkillGroupConfig({
  slug: "healthBehavior",
  id: "40836ce8-1c93-445d-820b-fb6dea325518",
  name: {
    en: "Health Behavior",
  },
  skills: {
    adherenceToCarePlans: adherenceToCarePlans_Skill_Data,
    behaviorChangeInterventions: behaviorChangeInterventions_Skill_Data,
    healthBeliefsAndAction: healthBeliefsAndAction_Skill_Data,
    socialSupportAndHealth: socialSupportAndHealth_Skill_Data,
  },
  description: {
    methodological: "Health psychology examines how beliefs, routines, social surroundings, and perceived barriers affect health-related decisions, without replacing medical guidance.",
    frontend: {
      en: "Discover how beliefs and social settings influence health-related choices.",
    },
  },
});
