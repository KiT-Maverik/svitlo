import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  calibrateASensor_Skill_Data,
  interpretSensorError_Skill_Data,
  sensorPlacement_Skill_Data,
  sensorSuitability_Skill_Data,
} from './skills';

export const sensorsAndMeasurement_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'sensorsAndMeasurement',
  id: '09504f07-f584-422a-9da0-ff042c983fc9',
  name: {
    en: 'Sensors and Measurement',
  },
  skills: {
    calibrateASensor: calibrateASensor_Skill_Data,
    interpretSensorError: interpretSensorError_Skill_Data,
    sensorPlacement: sensorPlacement_Skill_Data,
    sensorSuitability: sensorSuitability_Skill_Data,
  },
  description: {
    methodological:
      'Reliable decisions depend on selecting an appropriate measured quantity and understanding how placement, calibration and uncertainty shape the signal.',
    frontend: {
      en: 'Learn how sensors are chosen, calibrated and positioned.',
    },
  },
});
