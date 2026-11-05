import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  actuatorSuitability_Skill_Data,
  electricMotorConstruction_Skill_Data,
  limitSwitches_Skill_Data,
  motorDrivenActuation_Skill_Data,
  servoPositioning_Skill_Data,
} from './skills';

export const drivesAndActuators_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'drivesAndActuators',
  id: 'e4ad551e-d663-4758-8b09-8893ea518de9',
  name: {
    en: 'Drives and Actuators',
  },
  skills: {
    actuatorSuitability: actuatorSuitability_Skill_Data,
    electricMotorConstruction: electricMotorConstruction_Skill_Data,
    limitSwitches: limitSwitches_Skill_Data,
    motorDrivenActuation: motorDrivenActuation_Skill_Data,
    servoPositioning: servoPositioning_Skill_Data,
  },
  description: {
    methodological:
      'A controller requires suitable physical mechanisms to turn supplied energy into controllable displacement, rotation or force.',
    frontend: {
      en: 'Discover how powered actuators move physical components.',
    },
  },
});
