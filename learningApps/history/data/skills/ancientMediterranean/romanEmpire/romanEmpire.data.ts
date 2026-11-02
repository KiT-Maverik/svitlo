import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { augustanPrincipate_Skill_Data, dailyLifeInRomanEmpire_Skill_Data, romanLaw_Skill_Data, romanProvincialGovernment_Skill_Data, spreadOfChristianity_Skill_Data, transformationOfRomanEmpire_Skill_Data } from './skills';

export const romanEmpire_SkillGroup_Data = buildSkillGroupConfig({
  slug: "romanEmpire",
  id: "5e804ce3-42b3-46bf-b092-f045cae2add1",
  name: {
    en: "Римська імперія",
  },
  skills: {
    augustanPrincipate: augustanPrincipate_Skill_Data,
    dailyLifeInRomanEmpire: dailyLifeInRomanEmpire_Skill_Data,
    romanLaw: romanLaw_Skill_Data,
    romanProvincialGovernment: romanProvincialGovernment_Skill_Data,
    spreadOfChristianity: spreadOfChristianity_Skill_Data,
    transformationOfRomanEmpire: transformationOfRomanEmpire_Skill_Data,
  },
  description: {
    methodological: "A huge diverse state relied on armies, provincial rule, law, cities, and infrastructure before profound later transformations.",
    frontend: {
      en: "Explore how the Roman Empire governed many different peoples.",
    },
  },
});
