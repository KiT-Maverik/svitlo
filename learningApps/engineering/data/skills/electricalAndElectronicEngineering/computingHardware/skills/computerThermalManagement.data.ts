import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const computerThermalManagement_Skill_Data = buildSkillConfig({
  slug: "computerThermalManagement",
  id: "f7acd032-2509-40ad-9a46-fe9525c3b25e",
  name: {
    en: "Computer thermal management",
  },
  description: {
    methodological: "Relate computer component heat production to cooling paths, heat sinks, airflow and protection against excessive temperature.",
    frontend: {
      en: "Explain why computing hardware needs cooling and heat management.",
    },
  },
});
