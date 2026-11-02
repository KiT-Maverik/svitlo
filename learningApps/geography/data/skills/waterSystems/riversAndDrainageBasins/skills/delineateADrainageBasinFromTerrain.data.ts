import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const delineateADrainageBasinFromTerrain_Skill_Data = buildSkillConfig({
  slug: "delineateADrainageBasinFromTerrain",
  id: "e464d992-75f9-4edb-ae27-8538b0b78ecd",
  name: {
    en: "Delineate a drainage basin from terrain",
  },
  description: {
    methodological: "Infer the land area contributing runoff to an outlet using divides and slopes rather than administrative borders.",
    frontend: {
      en: "Identify the land that drains toward a particular river outlet.",
    },
  },
});
