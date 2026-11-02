import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { electrolysis_Skill_Data, galvanicCells_Skill_Data, oxidation_Skill_Data, redoxCouples_Skill_Data, reduction_Skill_Data } from './skills';

export const oxidationAndReduction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "oxidationAndReduction",
  id: "c683cf4a-511d-4fb9-94bf-bdeca8a7493f",
  name: {
    en: "Oxidation and Reduction",
  },
  skills: {
    electrolysis: electrolysis_Skill_Data,
    galvanicCells: galvanicCells_Skill_Data,
    oxidation: oxidation_Skill_Data,
    redoxCouples: redoxCouples_Skill_Data,
    reduction: reduction_Skill_Data,
  },
  description: {
    methodological: "Electron bookkeeping describes an important class of reactions even when electrons are not explicitly transferred between discrete ions.",
    frontend: {
      en: "Explore how oxidation and reduction relate to electron changes.",
    },
  },
});
