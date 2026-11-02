import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const renewableResourceDepletion_Skill_Data = buildSkillConfig({
  slug: "renewableResourceDepletion",
  id: "c4403ac4-ec37-4aec-8071-74d69736a954",
  name: {
    en: "Виснаження відновлюваних ресурсів",
  },
  description: {
    methodological: "Analyze the balance between natural replenishment and extraction rates, without equating renewable resources with inexhaustible ones.",
    frontend: {
      en: "Explore why even renewable resources can be depleted.",
    },
  },
});
