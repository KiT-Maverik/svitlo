import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyAnActuatorsPurpose_Skill_Data = buildSkillConfig({
  slug: "identifyAnActuatorsPurpose",
  id: "e221ab8e-3bb1-4fce-bf7c-ee82245d2310",
  name: {
    en: "Identify an Actuator's Purpose",
  },
  description: {
    methodological: "Recognize a device that receives a command and performs a physical action: a motor rotates a wheel while an LED changes light output. An actuator is not a sensor even if connected to the same controller.",
    frontend: {
      en: "Explain how motors, lights and other actuators carry out commands.",
    },
  },
});
