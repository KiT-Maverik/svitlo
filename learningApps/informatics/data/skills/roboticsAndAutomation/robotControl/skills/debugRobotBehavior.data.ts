import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const debugRobotBehavior_Skill_Data = buildSkillConfig({
  slug: "debugRobotBehavior",
  id: "f63b004b-94f5-4422-9275-af6f6ba4263e",
  name: {
    en: "Debug Robot Behavior",
  },
  description: {
    methodological: "Determine whether a navigation or response error arises from a sensor reading, controller condition, or actuator command, and correct the appropriate rule. Debugging requires comparing expected and observed actions.",
    frontend: {
      en: "Find whether a robot's unexpected behavior comes from sensing, logic or action.",
    },
  },
});
