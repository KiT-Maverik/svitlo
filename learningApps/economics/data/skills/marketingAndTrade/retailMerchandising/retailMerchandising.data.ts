import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { inventoryManagement_Skill_Data, productDisplay_Skill_Data, storeAssortment_Skill_Data, storeNavigation_Skill_Data } from './skills';

export const retailMerchandising_SkillGroup_Data = buildSkillGroupConfig({
  slug: "retailMerchandising",
  id: "b1f308b8-3a29-4230-acd4-881d99b208df",
  name: {
    en: "Мерчандайзинг і роздріб",
  },
  skills: {
    inventoryManagement: inventoryManagement_Skill_Data,
    productDisplay: productDisplay_Skill_Data,
    storeAssortment: storeAssortment_Skill_Data,
    storeNavigation: storeNavigation_Skill_Data,
  },
  description: {
    methodological: "Product placement, availability, presentation, and logistics affect how easily customers find and buy goods.",
    frontend: {
      en: "Explore how store layout and product displays shape shopping.",
    },
  },
});
