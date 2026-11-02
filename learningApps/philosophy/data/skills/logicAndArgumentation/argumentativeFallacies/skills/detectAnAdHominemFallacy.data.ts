import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectAnAdHominemFallacy_Skill_Data = buildSkillConfig({
  slug: "detectAnAdHominemFallacy",
  id: "cb327ba8-2a2a-4411-8b3b-bcc5bc51f37c",
  name: {
    en: "Detect an ad hominem fallacy",
  },
  description: {
    methodological: "Identify when a personal attack substitutes for addressing reasons, while distinguishing relevant credibility evidence from irrelevant insults.",
    frontend: {
      en: "Recognize when a personal attack replaces relevant reasoning.",
    },
  },
});
