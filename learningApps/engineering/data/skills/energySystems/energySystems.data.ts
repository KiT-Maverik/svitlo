import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { energyPerformance_SkillGroup_Data } from './energyPerformance/energyPerformance.data';
import { generation_SkillGroup_Data } from './generation/generation.data';
import { storageAndDelivery_SkillGroup_Data } from './storageAndDelivery/storageAndDelivery.data';

export const energySystems_SkillDomain_Data = buildSkillDomainConfig({
  slug: "energySystems",
  id: "765547fa-7745-41a4-bf42-bb02bd5c86c8",
  name: {
    en: "Energy Systems",
  },
  groups: {
    energyPerformance: energyPerformance_SkillGroup_Data,
    generation: generation_SkillGroup_Data,
    storageAndDelivery: storageAndDelivery_SkillGroup_Data,
  },
  description: {
    methodological: "Useful energy services depend on conversion, storage, power delivery and load management. The engineering emphasis is on connected equipment and operational limitations, while the principles of energy conservation belong to Physics.",
    frontend: {
      en: "Discover how engineered systems generate, store, move and use energy.",
    },
  },
});
