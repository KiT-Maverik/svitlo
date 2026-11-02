import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const unemploymentRate_Skill_Data = buildSkillConfig({
  slug: "unemploymentRate",
  id: "ea0b04ec-c227-4faf-86eb-72a6a30503f1",
  name: {
    en: "Рівень безробіття",
  },
  description: {
    methodological: "Interpret the share of unemployed people in the labor force according to statistical criteria for employment and active job search.",
    frontend: {
      en: "Understand who is counted when unemployment is measured.",
    },
  },
});
