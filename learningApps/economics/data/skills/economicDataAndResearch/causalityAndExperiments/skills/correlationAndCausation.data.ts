import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const correlationAndCausation_Skill_Data = buildSkillConfig({
  slug: "correlationAndCausation",
  id: "f5fc044c-3820-4941-ba9d-c2f715ad47dd",
  name: {
    en: "Кореляція і причинність",
  },
  description: {
    methodological: "Distinguish variables changing together from evidence supporting the causal effect of an intervention or changed factor.",
    frontend: {
      en: "Explain why two trends moving together does not prove one caused the other.",
    },
  },
});
