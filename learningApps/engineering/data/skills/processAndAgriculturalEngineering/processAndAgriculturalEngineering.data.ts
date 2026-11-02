import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { foodAndAgriculturalTechnology_SkillGroup_Data } from './foodAndAgriculturalTechnology/foodAndAgriculturalTechnology.data';
import { industrialProcessEquipment_SkillGroup_Data } from './industrialProcessEquipment/industrialProcessEquipment.data';
import { processArchitecture_SkillGroup_Data } from './processArchitecture/processArchitecture.data';

export const processAndAgriculturalEngineering_SkillDomain_Data = buildSkillDomainConfig({
  slug: "processAndAgriculturalEngineering",
  id: "ed20c277-0b50-43ea-acfa-292b9c850283",
  name: {
    en: "Process and Agricultural Engineering",
  },
  groups: {
    foodAndAgriculturalTechnology: foodAndAgriculturalTechnology_SkillGroup_Data,
    industrialProcessEquipment: industrialProcessEquipment_SkillGroup_Data,
    processArchitecture: processArchitecture_SkillGroup_Data,
  },
  description: {
    methodological: "Some engineered systems transform flowing materials rather than assembling separate mechanical parts. Their design coordinates equipment, transfer rates, process conditions and product quality; agricultural and food technologies adapt these principles to living materials and variable field environments.",
    frontend: {
      en: "Explore systems that transform materials and support food and agricultural production.",
    },
  },
});
