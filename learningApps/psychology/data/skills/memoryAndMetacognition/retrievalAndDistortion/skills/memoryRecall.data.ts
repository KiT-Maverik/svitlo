import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const memoryRecall_Skill_Data = buildSkillConfig({
  slug: "memoryRecall",
  id: "54d61a45-db3e-4e76-9796-7415979208db",
  name: {
    en: "Memory Recall",
  },
  description: {
    methodological: "Explain retrieving information without the target being presented among answer options or other direct cues.",
    frontend: {
      en: "Recall information without being shown the original answer.",
    },
  },
});
