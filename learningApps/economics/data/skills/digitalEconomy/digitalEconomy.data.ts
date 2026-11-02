import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { digitalProducts_SkillGroup_Data } from './digitalProducts/digitalProducts.data';
import { financialTechnology_SkillGroup_Data } from './financialTechnology/financialTechnology.data';
import { platformsAndNetworkEffects_SkillGroup_Data } from './platformsAndNetworkEffects/platformsAndNetworkEffects.data';

export const digitalEconomy_SkillDomain_Data = buildSkillDomainConfig({
  slug: "digitalEconomy",
  id: "dc2cecdf-3aa0-48e5-82ff-f53bb7642345",
  name: {
    en: "Цифрова економіка",
  },
  groups: {
    digitalProducts: digitalProducts_SkillGroup_Data,
    financialTechnology: financialTechnology_SkillGroup_Data,
    platformsAndNetworkEffects: platformsAndNetworkEffects_SkillGroup_Data,
  },
  description: {
    methodological: "Digital products and platforms change reproduction costs, market access, competition, and demand for labor. The focus is their economic mechanisms, not software implementation.",
    frontend: {
      en: "Explore how digital products and platforms change business and markets.",
    },
  },
});
