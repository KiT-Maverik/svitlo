import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { commercialRoleOfPackaging_Skill_Data, productLifeCycle_Skill_Data, productPositioning_Skill_Data, valueProposition_Skill_Data } from './skills';

export const productAndValueProposition_SkillGroup_Data = buildSkillGroupConfig({
  slug: "productAndValueProposition",
  id: "ee25f845-9931-474d-89d0-16c86a4579da",
  name: {
    en: "Продукт і ціннісна пропозиція",
  },
  skills: {
    commercialRoleOfPackaging: commercialRoleOfPackaging_Skill_Data,
    productLifeCycle: productLifeCycle_Skill_Data,
    productPositioning: productPositioning_Skill_Data,
    valueProposition: valueProposition_Skill_Data,
  },
  description: {
    methodological: "A commercial offering combines benefits, quality, service, and differences from alternatives, not just physical features.",
    frontend: {
      en: "Discover what makes a product or service valuable to customers.",
    },
  },
});
