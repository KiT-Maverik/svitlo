import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const safeDrinkingWater_Skill_Data = buildSkillConfig({
  slug: "safeDrinkingWater",
  id: "73d13167-e92f-401e-adb2-dac04a987f29",
  name: {
    en: "Safe drinking water",
  },
  description: {
    methodological: "Distinguish potable from potentially contaminated supplies and recognize when verified treatment or an alternative source is required.",
    frontend: {
      en: "Recognize when a water source may be unsafe for drinking.",
    },
  },
});
