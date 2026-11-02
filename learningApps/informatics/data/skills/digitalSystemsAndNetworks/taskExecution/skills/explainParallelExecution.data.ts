import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainParallelExecution_Skill_Data = buildSkillConfig({
  slug: "explainParallelExecution",
  id: "376c030a-d13f-43cf-b57a-74b1c8b3e756",
  name: {
    en: "Explain Parallel Execution",
  },
  description: {
    methodological: "Identify when independent operations truly run simultaneously on multiple computing resources. Distinguish parallelism from rapid task switching on one executor; additional resources do not guarantee proportional speedup.",
    frontend: {
      en: "Recognize when multiple processors actually perform work simultaneously.",
    },
  },
});
