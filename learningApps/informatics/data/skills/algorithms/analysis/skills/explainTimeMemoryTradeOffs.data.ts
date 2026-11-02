import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTimeMemoryTradeOffs_Skill_Data = buildSkillConfig({
  slug: "explainTimeMemoryTradeOffs",
  id: "dbfd2d28-4781-4da5-901d-7b4188bc3dcc",
  name: {
    en: "Explain Time–Memory Trade-offs",
  },
  description: {
    methodological: "Compare algorithms where fewer operations may require extra intermediate data; speed is not the only criterion for a sound choice.",
    frontend: {
      en: "Understand why faster algorithms may require more temporary memory.",
    },
  },
});
