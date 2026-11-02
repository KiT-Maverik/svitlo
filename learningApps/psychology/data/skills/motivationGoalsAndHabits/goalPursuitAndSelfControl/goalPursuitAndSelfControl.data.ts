import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { goalRevisionAndDisengagement_Skill_Data, goalSpecificity_Skill_Data, implementationIntentions_Skill_Data, selfControlAndInhibition_Skill_Data, selfEfficacy_Skill_Data } from './skills';

export const goalPursuitAndSelfControl_SkillGroup_Data = buildSkillGroupConfig({
  slug: "goalPursuitAndSelfControl",
  id: "81716eb9-7d4f-4895-a0ba-ffc107468b36",
  name: {
    en: "Goal Pursuit and Self-Control",
  },
  skills: {
    goalRevisionAndDisengagement: goalRevisionAndDisengagement_Skill_Data,
    goalSpecificity: goalSpecificity_Skill_Data,
    implementationIntentions: implementationIntentions_Skill_Data,
    selfControlAndInhibition: selfControlAndInhibition_Skill_Data,
    selfEfficacy: selfEfficacy_Skill_Data,
  },
  description: {
    methodological: "Persistent action requires monitoring progress, choosing responses, and adapting goals to changing conditions.",
    frontend: {
      en: "Learn how people set goals, stay on course and adapt when circumstances change.",
    },
  },
});
