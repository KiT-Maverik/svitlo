import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const productivity_Skill_Data = buildSkillConfig({
  slug: "productivity",
  id: "92fa2ed1-19b8-439a-82bc-df6cb090ceb3",
  name: {
    en: "Продуктивність",
  },
  description: {
    methodological: "Measure output relative to a production input and distinguish labor productivity from total factor productivity.",
    frontend: {
      en: "Explore how much output is produced from the resources used.",
    },
  },
});
