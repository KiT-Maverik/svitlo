import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainContextWindowOverflow_Skill_Data = buildSkillConfig({
  slug: "explainContextWindowOverflow",
  id: "27c90d7d-a28f-477f-bca4-8e8d8038113f",
  name: {
    en: "Explain Context Window Overflow",
  },
  description: {
    methodological: "Explain that when the limit is exceeded, a service may reject the request, truncate earlier content, or summarize parts of it.",
    frontend: {
      en: "Explore what can happen when a request exceeds a model's context limit.",
    },
  },
});
