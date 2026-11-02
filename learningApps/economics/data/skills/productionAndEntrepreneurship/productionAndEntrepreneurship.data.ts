import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { entrepreneurshipAndAccounting_SkillGroup_Data } from './entrepreneurshipAndAccounting/entrepreneurshipAndAccounting.data';
import { firmDecisionMakingAndManagement_SkillGroup_Data } from './firmDecisionMakingAndManagement/firmDecisionMakingAndManagement.data';
import { productionCostsAndScale_SkillGroup_Data } from './productionCostsAndScale/productionCostsAndScale.data';
import { productiveResourcesAndTechnology_SkillGroup_Data } from './productiveResourcesAndTechnology/productiveResourcesAndTechnology.data';

export const productionAndEntrepreneurship_SkillDomain_Data = buildSkillDomainConfig({
  slug: "productionAndEntrepreneurship",
  id: "02c4f179-d868-4c51-8bf7-031bcd0bd182",
  name: {
    en: "Виробництво та підприємництво",
  },
  groups: {
    entrepreneurshipAndAccounting: entrepreneurshipAndAccounting_SkillGroup_Data,
    firmDecisionMakingAndManagement: firmDecisionMakingAndManagement_SkillGroup_Data,
    productionCostsAndScale: productionCostsAndScale_SkillGroup_Data,
    productiveResourcesAndTechnology: productiveResourcesAndTechnology_SkillGroup_Data,
  },
  description: {
    methodological: "Creating value combines resources, technology, organization, and risk. This domain studies firms' production decisions and the sustainability of their operations.",
    frontend: {
      en: "Explore how businesses turn resources and ideas into products and services.",
    },
  },
});
