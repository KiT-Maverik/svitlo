import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const decomposeAProblem_Skill_Data = buildSkillConfig({
  slug: "decomposeAProblem",
  id: "e55d6094-24de-4bb5-89cd-38ab16451d9d",
  name: {
    en: "Decompose a Problem",
  },
  description: {
    methodological: "Identify independent subproblems with distinct outcomes that collectively solve the original problem. For example, finding a route involves identifying the start, destination, and allowed transitions.",
    frontend: {
      en: "Break a large problem into smaller tasks that can be solved separately.",
    },
  },
});
