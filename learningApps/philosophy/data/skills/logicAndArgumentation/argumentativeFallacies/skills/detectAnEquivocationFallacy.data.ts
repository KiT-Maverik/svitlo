import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectAnEquivocationFallacy_Skill_Data = buildSkillConfig({
  slug: "detectAnEquivocationFallacy",
  id: "14c8c084-88e7-4874-8e69-7e693dc5c367",
  name: {
    en: "Detect an equivocation fallacy",
  },
  description: {
    methodological: "Trace a shift between meanings of the same expression that makes an inference appear stronger than it is.",
    frontend: {
      en: "Spot when the meaning of a word shifts within an argument.",
    },
  },
});
