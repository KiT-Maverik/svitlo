import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const implementRobotObstacleResponse_Skill_Data = buildSkillConfig({
  slug: "implementRobotObstacleResponse",
  id: "44e6d553-194f-4331-9981-d5f583ab6a99",
  name: {
    en: "Implement Robot Obstacle Response",
  },
  description: {
    methodological: "Link a sensor reading or simulated state to a maneuver such as stopping, turning, or bypassing an obstacle, and verify the action occurs only under the intended condition.",
    frontend: {
      en: "Make a robot stop, turn or avoid an obstacle when a sensor detects it.",
    },
  },
});
