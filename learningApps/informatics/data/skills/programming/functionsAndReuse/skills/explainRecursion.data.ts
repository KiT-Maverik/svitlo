import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainRecursion_Skill_Data = buildSkillConfig({
  slug: "explainRecursion",
  id: "00025f01-ef21-4851-acc8-8c42c1aed040",
  name: {
    en: "Explain Recursion",
  },
  description: {
    methodological: "Trace a function that calls itself on a simpler case and identify the base condition that ends the calls. For example, computing a factorial involves both reducing the argument and terminating at the base case.",
    frontend: {
      en: "Understand how a recursive function solves smaller cases and eventually stops.",
    },
  },
});
