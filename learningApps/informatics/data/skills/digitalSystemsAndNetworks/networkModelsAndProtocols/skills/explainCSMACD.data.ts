import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainCSMACD_Skill_Data = buildSkillConfig({
  slug: "explainCSMACD",
  id: "b8dd31c0-7aff-49d9-84d5-1a339f47e344",
  name: {
    en: "Explain CSMA/CD",
  },
  description: {
    methodological: "Describe how classic shared-medium Ethernet senses channel activity, detects collisions, and retries after a delay. Modern switched full-duplex Ethernet normally does not need this mechanism.",
    frontend: {
      en: "Learn why older shared Ethernet networks needed collision detection.",
    },
  },
});
