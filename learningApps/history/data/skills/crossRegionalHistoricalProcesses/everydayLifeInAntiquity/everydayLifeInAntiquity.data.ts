import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientDiets_Skill_Data, ancientWorkAndOccupations_Skill_Data, childhoodAndEducationInAntiquity_Skill_Data, familyAndKinship_Skill_Data, housingAndDomesticSpace_Skill_Data, leisureAndPublicLife_Skill_Data } from './skills';

export const everydayLifeInAntiquity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "everydayLifeInAntiquity",
  id: "fd3f6b88-5a95-49a7-9df4-bc044b840af6",
  name: {
    en: "Повсякденне життя",
  },
  skills: {
    ancientDiets: ancientDiets_Skill_Data,
    ancientWorkAndOccupations: ancientWorkAndOccupations_Skill_Data,
    childhoodAndEducationInAntiquity: childhoodAndEducationInAntiquity_Skill_Data,
    familyAndKinship: familyAndKinship_Skill_Data,
    housingAndDomesticSpace: housingAndDomesticSpace_Skill_Data,
    leisureAndPublicLife: leisureAndPublicLife_Skill_Data,
  },
  description: {
    methodological: "Compare dwellings, objects, texts, and images to reconstruct family relations and daily practices across regions.",
    frontend: {
      en: "Discover what ordinary people did in ancient daily life.",
    },
  },
});
