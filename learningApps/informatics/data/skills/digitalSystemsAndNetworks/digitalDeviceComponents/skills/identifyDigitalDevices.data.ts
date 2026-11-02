import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyDigitalDevices_Skill_Data = buildSkillConfig({
  slug: "identifyDigitalDevices",
  id: "0000b5e9-fa19-45d0-8b8d-1367d82dc123",
  name: {
    en: "Identify Digital Devices",
  },
  description: {
    methodological: "Determine whether a device uses digital representation and programmable information processing rather than purely mechanical or analog means. The appearance of a screen or buttons is insufficient by itself.",
    frontend: {
      en: "Recognize devices that process programmable digital information.",
    },
  },
});
