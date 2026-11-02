import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const facade_Skill_Data = buildSkillConfig({
  slug: "facade",
  id: "0f38c5f5-615f-40eb-a614-3da953dfc0c4",
  name: {
    en: "Facade",
  },
  description: {
    methodological: "Provide a simplified entry point hiding complex sequences of subsystem calls without replacing the entire subsystem interface.",
    frontend: {
      en: "Offer a simple entry point to a complex collection of components.",
    },
  },
});
