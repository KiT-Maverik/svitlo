import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const servoPositioning_Skill_Data = buildSkillConfig({
  slug: 'servoPositioning',
  id: '6d6cddc0-cddd-4ecd-9a30-0c32b692908f',
  name: {
    en: 'Servo positioning',
  },
  description: {
    methodological: "Identify the use of position feedback to command and maintain an actuator's location.",
    frontend: {
      en: 'Understand how a servo mechanism controls a position.',
    },
  },
});
