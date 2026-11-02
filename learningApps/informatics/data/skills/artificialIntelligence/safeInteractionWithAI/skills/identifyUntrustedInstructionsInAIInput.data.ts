import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyUntrustedInstructionsInAIInput_Skill_Data = buildSkillConfig({
  slug: "identifyUntrustedInstructionsInAIInput",
  id: "fe0b7a24-27f7-407c-b56f-d69a0fa24192",
  name: {
    en: "Identify Untrusted Instructions in AI Input",
  },
  description: {
    methodological: "Distinguish the content of an external document being analyzed from the user's instructions; third-party text should not automatically control system behavior.",
    frontend: {
      en: "Recognize instructions hidden in external material that should not control an assistant.",
    },
  },
});
