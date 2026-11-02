import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const inductiveReasoning_Skill_Data = buildSkillConfig({
  slug: "inductiveReasoning",
  id: "b03a66a9-ea5e-4270-916f-e1e96771cfb5",
  name: {
    en: "Inductive Reasoning",
  },
  description: {
    methodological: "Explain generalizing beyond observed cases and why resulting conclusions remain uncertain.",
    frontend: {
      en: "Recognize how examples support tentative broader conclusions.",
    },
  },
});
