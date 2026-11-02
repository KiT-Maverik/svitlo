import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishLakesRiversAndWetlandsByWaterBehavior_Skill_Data = buildSkillConfig({
  slug: "distinguishLakesRiversAndWetlandsByWaterBehavior",
  id: "8a7b984d-78c5-4772-81ed-f8ba2ec8b2d4",
  name: {
    en: "Distinguish lakes, rivers, and wetlands by water behavior",
  },
  description: {
    methodological: "Recognize characteristic movement and retention of water without treating all standing or shallow water as the same feature.",
    frontend: {
      en: "Tell a lake from a river or wetland by how water moves and collects.",
    },
  },
});
