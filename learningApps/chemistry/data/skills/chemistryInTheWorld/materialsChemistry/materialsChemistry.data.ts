import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { alloysInUse_Skill_Data, ceramics_Skill_Data, corrosion_Skill_Data, elastomers_Skill_Data, glass_Skill_Data, metalsInUse_Skill_Data, plastics_Skill_Data } from './skills';

export const materialsChemistry_SkillGroup_Data = buildSkillGroupConfig({
  slug: "materialsChemistry",
  id: "da922b08-51d3-43ca-b82f-2e49452bfeef",
  name: {
    en: "Materials Chemistry",
  },
  skills: {
    alloysInUse: alloysInUse_Skill_Data,
    ceramics: ceramics_Skill_Data,
    corrosion: corrosion_Skill_Data,
    elastomers: elastomers_Skill_Data,
    glass: glass_Skill_Data,
    metalsInUse: metalsInUse_Skill_Data,
    plastics: plastics_Skill_Data,
  },
  description: {
    methodological: "A product's useful behavior depends on composition, microscopic structure and conditions of use, not merely its everyday material label.",
    frontend: {
      en: "Explore how chemical structure helps determine a material's useful properties.",
    },
  },
});
