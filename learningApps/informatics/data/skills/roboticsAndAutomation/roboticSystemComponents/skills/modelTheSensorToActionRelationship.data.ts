import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const modelTheSensorToActionRelationship_Skill_Data = buildSkillConfig({
  slug: "modelTheSensorToActionRelationship",
  id: "6c5356a3-c0fb-4f30-b08a-84b04410822d",
  name: {
    en: "Model the Sensor-to-Action Relationship",
  },
  description: {
    methodological: "Relate a measured condition, a controller rule, and an actuator command, such as 'stop the motor if distance falls below the threshold.' Distinguish the sensor reading from the programmed decision.",
    frontend: {
      en: "Link a sensor measurement, a decision rule and an actuator response.",
    },
  },
});
