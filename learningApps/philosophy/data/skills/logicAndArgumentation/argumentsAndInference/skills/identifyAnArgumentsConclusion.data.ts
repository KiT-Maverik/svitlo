import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyAnArgumentsConclusion_Skill_Data = buildSkillConfig({
  slug: "identifyAnArgumentsConclusion",
  id: "09c4373a-75c0-4319-950a-ad93b395a9d8",
  name: {
    en: "Identify an argument's conclusion",
  },
  description: {
    methodological: "Determine which proposition is supposed to follow or gain support, regardless of its position in a passage.",
    frontend: {
      en: "Identify the central claim an argument is trying to establish.",
    },
  },
});
