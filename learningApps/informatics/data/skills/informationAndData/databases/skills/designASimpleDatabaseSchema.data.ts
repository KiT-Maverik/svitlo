import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const designASimpleDatabaseSchema_Skill_Data = buildSkillConfig({
  slug: "designASimpleDatabaseSchema",
  id: "be337a54-262a-4bf5-a9ad-54fffb8247b3",
  name: {
    en: "Design a Simple Database Schema",
  },
  description: {
    methodological: "Independently identify entities, fields, keys, and required relationships for a task without needlessly duplicating facts. For example, model books and loans separately for a library; this designs a coherent schema rather than describing an existing table.",
    frontend: {
      en: "Plan a simple database with suitable entities, fields and links.",
    },
  },
});
