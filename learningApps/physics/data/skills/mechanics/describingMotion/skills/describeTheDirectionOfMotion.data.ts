import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const describeTheDirectionOfMotion_Skill_Data = buildSkillConfig({
  slug: "describeTheDirectionOfMotion",
  id: "afdae8eb-d3e3-43cb-bff6-0a22d17f86c1",
  name: {
    en: "Describe the direction of motion",
  },
  description: {
    methodological: "Determine the direction of a body's velocity or displacement relative to a selected reference frame, distinguishing direction from the total distance traveled.",
    frontend: {
      en: "Identify the direction of motion from a chosen point of view.",
    },
  },
});
