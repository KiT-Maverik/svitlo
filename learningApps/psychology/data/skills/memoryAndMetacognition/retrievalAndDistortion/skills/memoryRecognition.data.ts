import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const memoryRecognition_Skill_Data = buildSkillConfig({
  slug: "memoryRecognition",
  id: "0776c1b4-5c0d-47ed-bb55-dd307d7453cf",
  name: {
    en: "Memory Recognition",
  },
  description: {
    methodological: "Explain identifying previously encountered information when the candidate item is presented.",
    frontend: {
      en: "Recognize previously encountered information among alternatives.",
    },
  },
});
