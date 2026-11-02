import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { drivesAndActuators_SkillGroup_Data } from './drivesAndActuators/drivesAndActuators.data';
import { feedbackAndControl_SkillGroup_Data } from './feedbackAndControl/feedbackAndControl.data';
import { robotSystems_SkillGroup_Data } from './robotSystems/robotSystems.data';
import { sensorsAndMeasurement_SkillGroup_Data } from './sensorsAndMeasurement/sensorsAndMeasurement.data';

export const automationAndRobotics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "automationAndRobotics",
  id: "c32e04b7-c5a4-4ac8-9d12-0fdcd8ab6248",
  name: {
    en: "Automation and Robotics",
  },
  groups: {
    drivesAndActuators: drivesAndActuators_SkillGroup_Data,
    feedbackAndControl: feedbackAndControl_SkillGroup_Data,
    robotSystems: robotSystems_SkillGroup_Data,
    sensorsAndMeasurement: sensorsAndMeasurement_SkillGroup_Data,
  },
  description: {
    methodological: "Robotic and automated machinery converts physical observations into controlled actions. Engineering competencies concern sensors, actuators, feedback, mechanism geometry and dependable operation; general algorithms and software authoring remain in Informatics.",
    frontend: {
      en: "Discover how sensors, controls and actuators make physical systems respond.",
    },
  },
});
