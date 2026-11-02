import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identifyAnActuatorsPurpose_Skill_Data, identifyARobotController_Skill_Data, identifyASensorsPurpose_Skill_Data, modelTheSensorToActionRelationship_Skill_Data } from './skills';

export const roboticSystemComponents_SkillGroup_Data = buildSkillGroupConfig({
  slug: "roboticSystemComponents",
  id: "9f96ada8-9d7a-4879-bd0d-25bb482d107d",
  name: {
    en: "Robotic System Components",
  },
  skills: {
    identifyAnActuatorsPurpose: identifyAnActuatorsPurpose_Skill_Data,
    identifyARobotController: identifyARobotController_Skill_Data,
    identifyASensorsPurpose: identifyASensorsPurpose_Skill_Data,
    modelTheSensorToActionRelationship: modelTheSensorToActionRelationship_Skill_Data,
  },
  description: {
    methodological: "Information-processing roles of sensors, controllers, and actuators: receive a reading, apply a control rule, and change a state. This examines functional relationships rather than mechanical component design.",
    frontend: {
      en: "Learn how a robot detects conditions, decides what to do and acts.",
    },
  },
});
