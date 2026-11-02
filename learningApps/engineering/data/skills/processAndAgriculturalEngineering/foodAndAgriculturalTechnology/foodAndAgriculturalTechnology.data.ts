import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { fermentationProductionEquipment_Skill_Data, foodPreservationEquipment_Skill_Data, irrigationEngineering_Skill_Data, precisionAgriculturalEquipment_Skill_Data } from './skills';

export const foodAndAgriculturalTechnology_SkillGroup_Data = buildSkillGroupConfig({
  slug: "foodAndAgriculturalTechnology",
  id: "417ce3ed-fa39-4a56-a791-951228eb78b0",
  name: {
    en: "Food and Agricultural Technology",
  },
  skills: {
    fermentationProductionEquipment: fermentationProductionEquipment_Skill_Data,
    foodPreservationEquipment: foodPreservationEquipment_Skill_Data,
    irrigationEngineering: irrigationEngineering_Skill_Data,
    precisionAgriculturalEquipment: precisionAgriculturalEquipment_Skill_Data,
  },
  description: {
    methodological: "Food and field equipment must handle biological materials with variable properties and constraints involving spoilage, hygiene, water use and environmental conditions.",
    frontend: {
      en: "Explore machines that store food and support modern agriculture.",
    },
  },
});
