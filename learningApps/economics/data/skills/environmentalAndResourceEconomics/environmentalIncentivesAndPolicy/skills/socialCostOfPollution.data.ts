import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const socialCostOfPollution_Skill_Data = buildSkillConfig({
  slug: "socialCostOfPollution",
  id: "d5f9f207-6410-4870-9863-c06158cf3346",
  name: {
    en: "Соціальна вартість забруднення",
  },
  description: {
    methodological: "Evaluate harms not included in a polluter's private costs under stated assumptions.",
    frontend: {
      en: "Recognize pollution costs that fall on other people.",
    },
  },
});
