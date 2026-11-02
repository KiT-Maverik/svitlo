import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeLandformsCreatedByVolcanicActivity_Skill_Data = buildSkillConfig({
  slug: "recognizeLandformsCreatedByVolcanicActivity",
  id: "9b509d23-f275-43e6-b010-7c5ef341396e",
  name: {
    en: "Recognize landforms created by volcanic activity",
  },
  description: {
    methodological: "Connect lava flows, volcanic cones, craters and calderas with erupted or collapsed volcanic structures while avoiding a single universal volcano shape.",
    frontend: {
      en: "Recognize volcano-related forms such as cones, craters and lava fields.",
    },
  },
});
