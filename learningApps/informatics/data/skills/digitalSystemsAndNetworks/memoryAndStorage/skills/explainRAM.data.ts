import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainRAM_Skill_Data = buildSkillConfig({
  slug: "explainRAM",
  id: "8ba809d1-b245-4088-b7c4-c4294bd8f805",
  name: {
    en: "Explain RAM",
  },
  description: {
    methodological: "RAM holds working instructions and data for fast access during execution; its contents are usually lost when power is removed.",
    frontend: {
      en: "Explore how RAM holds working information while a computer runs.",
    },
  },
});
