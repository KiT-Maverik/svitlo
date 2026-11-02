import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const deductiveReasoning_Skill_Data = buildSkillConfig({
  slug: "deductiveReasoning",
  id: "8b395705-3e73-495e-aa72-a63866ce7e96",
  name: {
    en: "Deductive Reasoning",
  },
  description: {
    methodological: "Explain drawing conclusions that follow from given premises, distinguishing actual human performance from formal validity.",
    frontend: {
      en: "Distinguish conclusions that necessarily follow from stated premises.",
    },
  },
});
