import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { akkadianEmpire_Skill_Data, assyrianEmpire_Skill_Data, babylonianKingdoms_Skill_Data, cuneiformWriting_Skill_Data, mesopotamianIrrigation_Skill_Data, sumerianCityStates_Skill_Data } from './skills';

export const mesopotamia_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mesopotamia",
  id: "00e49671-064e-43da-85ae-e413fef5d01f",
  name: {
    en: "Межиріччя",
  },
  skills: {
    akkadianEmpire: akkadianEmpire_Skill_Data,
    assyrianEmpire: assyrianEmpire_Skill_Data,
    babylonianKingdoms: babylonianKingdoms_Skill_Data,
    cuneiformWriting: cuneiformWriting_Skill_Data,
    mesopotamianIrrigation: mesopotamianIrrigation_Skill_Data,
    sumerianCityStates: sumerianCityStates_Skill_Data,
  },
  description: {
    methodological: "The Tigris and Euphrates valleys supported cities, complex administration, writing, and successive supraregional states.",
    frontend: {
      en: "Learn how river valleys supported Mesopotamian cities and states.",
    },
  },
});
