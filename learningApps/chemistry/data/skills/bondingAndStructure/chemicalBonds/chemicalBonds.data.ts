import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bondPolarity_Skill_Data, covalentBonding_Skill_Data, ionicBonding_Skill_Data, metallicBonding_Skill_Data } from './skills';

export const chemicalBonds_SkillGroup_Data = buildSkillGroupConfig({
  slug: "chemicalBonds",
  id: "72253b70-fba9-4ed0-9b07-f715e467d662",
  name: {
    en: "Chemical Bonds",
  },
  skills: {
    bondPolarity: bondPolarity_Skill_Data,
    covalentBonding: covalentBonding_Skill_Data,
    ionicBonding: ionicBonding_Skill_Data,
    metallicBonding: metallicBonding_Skill_Data,
  },
  description: {
    methodological: "Different electron distributions support different limiting models of chemical bonding; real substances can have mixed characteristics.",
    frontend: {
      en: "Explore how atoms and ions form chemical bonds with different electron arrangements.",
    },
  },
});
