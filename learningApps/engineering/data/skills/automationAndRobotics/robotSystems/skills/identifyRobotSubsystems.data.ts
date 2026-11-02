import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyRobotSubsystems_Skill_Data = buildSkillConfig({
  slug: "identifyRobotSubsystems",
  id: "ef410372-ea72-4e5b-ac98-ae91a4a0091f",
  name: {
    en: "Identify robot subsystems",
  },
  description: {
    methodological: "Assign roles to structure, power, sensors, actuators and controller in a robot.",
    frontend: {
      en: "Identify the sensors, controller, drives and frame in a robot.",
    },
  },
});
