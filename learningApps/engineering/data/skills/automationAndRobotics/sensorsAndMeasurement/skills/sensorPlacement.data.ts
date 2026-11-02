import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const sensorPlacement_Skill_Data = buildSkillConfig({
  slug: "sensorPlacement",
  id: "13524912-c933-4b03-83ad-1ea18259c67a",
  name: {
    en: "Sensor placement",
  },
  description: {
    methodological: "Relate position and orientation to what a detector can and cannot observe.",
    frontend: {
      en: "Find a sensor location that provides useful readings.",
    },
  },
});
