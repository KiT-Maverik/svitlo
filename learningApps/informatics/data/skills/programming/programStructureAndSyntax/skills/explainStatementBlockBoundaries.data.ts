import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainStatementBlockBoundaries_Skill_Data = buildSkillConfig({
  slug: "explainStatementBlockBoundaries",
  id: "8e1df7cf-ed63-44f9-af83-05d0e564eb72",
  name: {
    en: "Explain Statement Block Boundaries",
  },
  description: {
    methodological: "Identify which instructions belong to a function, loop, or conditional branch based on braces or indentation in a language, without confusing a block with an entire file.",
    frontend: {
      en: "Find which commands belong inside a loop, function or conditional block.",
    },
  },
});
