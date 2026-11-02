import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const safeControlFallback_Skill_Data = buildSkillConfig({
  slug: "safeControlFallback",
  id: "b8a25003-e4e7-45e1-a7f8-b9c23f1cbbe6",
  name: {
    en: "Safe control fallback",
  },
  description: {
    methodological: "Describe how critical equipment should react to missing power, unreliable sensing or lost communication.",
    frontend: {
      en: "Recognize when a control system needs a safe response to failure.",
    },
  },
});
