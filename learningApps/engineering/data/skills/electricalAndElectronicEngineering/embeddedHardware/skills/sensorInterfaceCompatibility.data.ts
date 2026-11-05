import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const sensorInterfaceCompatibility_Skill_Data = buildSkillConfig({
  slug: 'sensorInterfaceCompatibility',
  id: 'b901921d-8e5a-487f-8e84-85d5a475cf9f',
  name: {
    en: 'Sensor-interface compatibility',
  },
  description: {
    methodological:
      'Assess whether a sensor output, supply voltage, signal level and timing are compatible with a particular data acquisition input.',
    frontend: {
      en: "Check whether sensor signals match a controller's input requirements.",
    },
  },
});
