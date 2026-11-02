import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chemicalProperties_Skill_Data, density_Skill_Data, physicalProperties_Skill_Data, propertyBasedIdentification_Skill_Data } from './skills';

export const characteristicProperties_SkillGroup_Data = buildSkillGroupConfig({
  slug: "characteristicProperties",
  id: "a7cda477-ab13-43d0-88b0-0c16cb494146",
  name: {
    en: "Characteristic Properties",
  },
  skills: {
    chemicalProperties: chemicalProperties_Skill_Data,
    density: density_Skill_Data,
    physicalProperties: physicalProperties_Skill_Data,
    propertyBasedIdentification: propertyBasedIdentification_Skill_Data,
  },
  description: {
    methodological: "Physical and chemical properties supply different evidence about substances, and measurements are meaningful only under stated conditions.",
    frontend: {
      en: "Explore measurable properties that help describe and identify substances.",
    },
  },
});
