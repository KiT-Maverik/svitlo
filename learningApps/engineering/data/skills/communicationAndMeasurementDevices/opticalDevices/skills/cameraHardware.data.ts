import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const cameraHardware_Skill_Data = buildSkillConfig({
  slug: "cameraHardware",
  id: "996b9ce3-2e0c-4f98-bfb4-d7e930267e24",
  name: {
    en: "Camera hardware",
  },
  description: {
    methodological: "Trace light through an optical path onto an image sensor, apart from software image processing.",
    frontend: {
      en: "Trace how a camera's optics and sensor produce an image.",
    },
  },
});
