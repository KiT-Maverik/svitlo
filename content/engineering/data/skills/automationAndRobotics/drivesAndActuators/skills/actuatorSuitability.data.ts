import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const actuatorSuitability_Skill_Data = buildSkillConfig({
  slug: 'actuatorSuitability',
  id: '4f0e0455-8ed3-443c-ad1d-bf7b23f5ebe5',
  name: {
    en: 'Actuator suitability',
  },
  description: {
    methodological:
      'Relate required torque, force, travel, speed and duty cycle to an available driving principle and its energy supply.',
    frontend: {
      en: 'Choose actuators that fit required motion, forces and operating limits.',
    },
  },
});
