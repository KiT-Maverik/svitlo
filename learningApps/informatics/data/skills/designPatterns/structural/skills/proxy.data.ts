import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const proxy_Skill_Data = buildSkillConfig({
  slug: "proxy",
  id: "1709b904-6835-4563-a8db-b536d0187a6e",
  name: {
    en: "Proxy",
  },
  description: {
    methodological: "Control access to another object through a proxy sharing its interface—for example, to check authorization, cache results, or defer loading.",
    frontend: {
      en: "Control access to an object using another object with the same interface.",
    },
  },
});
