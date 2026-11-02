import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { centrifugation_Skill_Data, chromatography_Skill_Data, crystallization_Skill_Data, decantation_Skill_Data, distillation_Skill_Data, evaporativeSeparation_Skill_Data, filtration_Skill_Data } from './skills';

export const separation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "separation",
  id: "7b49641b-fcb5-4dd2-8deb-8cb2363604a7",
  name: {
    en: "Separation",
  },
  skills: {
    centrifugation: centrifugation_Skill_Data,
    chromatography: chromatography_Skill_Data,
    crystallization: crystallization_Skill_Data,
    decantation: decantation_Skill_Data,
    distillation: distillation_Skill_Data,
    evaporativeSeparation: evaporativeSeparation_Skill_Data,
    filtration: filtration_Skill_Data,
  },
  description: {
    methodological: "Choosing a technique requires identifying which physical property differs between the components.",
    frontend: {
      en: "Discover how differences in physical properties help separate mixtures.",
    },
  },
});
