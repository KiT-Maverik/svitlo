import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const respondToSuspectedPoisoning_Skill_Data = buildSkillConfig({
  slug: "respondToSuspectedPoisoning",
  id: "71b84e35-3ad3-4a1e-a25d-0a472e519c7a",
  name: {
    en: "Respond to suspected poisoning",
  },
  description: {
    methodological: "Identify possible toxic exposures, prevent further exposure without risking the helper and seek poison-service or emergency guidance; do not induce vomiting or improvise remedies. Opioid-specific response is addressed separately.",
    frontend: {
      en: "Seek poison or emergency guidance rather than improvising poisoning remedies.",
    },
  },
});
