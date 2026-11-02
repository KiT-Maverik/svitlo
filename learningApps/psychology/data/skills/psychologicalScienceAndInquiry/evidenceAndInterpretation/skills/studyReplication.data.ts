import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const studyReplication_Skill_Data = buildSkillConfig({
  slug: "studyReplication",
  id: "eedb03e6-836f-4989-8a7c-36cb025b670b",
  name: {
    en: "Study Replication",
  },
  description: {
    methodological: "Explain why repeating a psychological investigation with new observations helps assess the robustness and generality of a result.",
    frontend: {
      en: "Understand why repeating a study helps test whether a finding is robust.",
    },
  },
});
