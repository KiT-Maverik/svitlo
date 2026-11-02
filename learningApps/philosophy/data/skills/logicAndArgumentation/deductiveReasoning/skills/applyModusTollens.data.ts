import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyModusTollens_Skill_Data = buildSkillConfig({
  slug: "applyModusTollens",
  id: "fb1822ac-5ac9-4d3e-89f0-c733ecff4d4c",
  name: {
    en: "Apply modus tollens",
  },
  description: {
    methodological: "Reject the antecedent of a conditional from the denial of its consequent, under the conditional as stated.",
    frontend: {
      en: "Use a conditional and the denial of its result to reject its antecedent.",
    },
  },
});
