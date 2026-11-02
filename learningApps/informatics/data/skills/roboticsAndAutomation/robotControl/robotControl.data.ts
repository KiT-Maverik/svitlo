import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { configureARepeatedRobotAction_Skill_Data, createARobotMovementSequence_Skill_Data, debugRobotBehavior_Skill_Data, implementRobotObstacleResponse_Skill_Data } from './skills';

export const robotControl_SkillGroup_Data = buildSkillGroupConfig({
  slug: "robotControl",
  id: "346f7bb7-c1ac-4615-99b2-d9551d10e129",
  name: {
    en: "Robot Control",
  },
  skills: {
    configureARepeatedRobotAction: configureARepeatedRobotAction_Skill_Data,
    createARobotMovementSequence: createARobotMovementSequence_Skill_Data,
    debugRobotBehavior: debugRobotBehavior_Skill_Data,
    implementRobotObstacleResponse: implementRobotObstacleResponse_Skill_Data,
  },
  description: {
    methodological: "Construct and adjust commands for movement, obstacle response, and repeated robot operations. Unlike general programming, these algorithms interact with a physical or simulated environment.",
    frontend: {
      en: "Create and improve instructions for a robot's movements and responses.",
    },
  },
});
