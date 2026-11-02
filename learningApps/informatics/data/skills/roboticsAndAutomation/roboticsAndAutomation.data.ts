import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { robotControl_SkillGroup_Data } from './robotControl/robotControl.data';
import { roboticSystemComponents_SkillGroup_Data } from './roboticSystemComponents/roboticSystemComponents.data';

export const roboticsAndAutomation_SkillDomain_Data = buildSkillDomainConfig({
  slug: "roboticsAndAutomation",
  id: "ed451cc0-6d3a-44d2-8dba-ad0b89441519",
  name: {
    en: "Robotics and Automation",
  },
  groups: {
    robotControl: robotControl_SkillGroup_Data,
    roboticSystemComponents: roboticSystemComponents_SkillGroup_Data,
  },
  description: {
    methodological: "Programming the control logic of physical or simulated actuators in response to sensor readings. Engineering may also study mechanical design; this taxonomy emphasizes the relationship among information, rules, and actions.",
    frontend: {
      en: "Explore how sensors, programming and actuators allow robots to respond to their surroundings.",
    },
  },
});
