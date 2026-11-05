import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const mainMemoryHardware_Skill_Data = buildSkillConfig({
  slug: 'mainMemoryHardware',
  id: '4e2f5104-5020-41b3-b8fd-660b68b2eab2',
  name: {
    en: 'Main memory hardware',
  },
  description: {
    methodological:
      'Distinguish operational random-access memory from persistent storage using volatility, capacity, latency and connection to processing hardware.',
    frontend: {
      en: "Understand the hardware role of a computer's main working memory.",
    },
  },
});
