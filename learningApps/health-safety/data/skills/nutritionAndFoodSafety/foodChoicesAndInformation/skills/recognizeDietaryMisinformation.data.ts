import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeDietaryMisinformation_Skill_Data = buildSkillConfig({
  slug: "recognizeDietaryMisinformation",
  id: "6f324622-539c-40d6-964c-d4cd82d6e6db",
  name: {
    en: "Recognize dietary misinformation",
  },
  description: {
    methodological: "Distinguish evidence-based nutritional advice from detox claims, extreme restrictions, and unsupported promises of rapid results.",
    frontend: {
      en: "Recognize unsupported claims about diets, detoxes and quick results.",
    },
  },
});
