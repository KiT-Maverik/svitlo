import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { cognitiveSchemas_Skill_Data, conceptFormation_Skill_Data, exemplarBasedCategorization_Skill_Data, mentalModels_Skill_Data, prototypeBasedCategorization_Skill_Data } from './skills';

export const mentalRepresentation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mentalRepresentation",
  id: "767b7958-8278-458d-8cae-00543381b861",
  name: {
    en: "Mental Representation",
  },
  skills: {
    cognitiveSchemas: cognitiveSchemas_Skill_Data,
    conceptFormation: conceptFormation_Skill_Data,
    exemplarBasedCategorization: exemplarBasedCategorization_Skill_Data,
    mentalModels: mentalModels_Skill_Data,
    prototypeBasedCategorization: prototypeBasedCategorization_Skill_Data,
  },
  description: {
    methodological: "Categories, schemas, and internal models compress information, enabling predictions while sometimes concealing important differences.",
    frontend: {
      en: "Discover how mental concepts and representations organize information.",
    },
  },
});
