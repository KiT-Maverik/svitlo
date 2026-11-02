import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { earlyStateFormation_Skill_Data, slaveryAndOtherDependencies_Skill_Data, socialHierarchies_Skill_Data, womenInAncientSocieties_Skill_Data } from './skills';

export const powerAndSocialRelations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "powerAndSocialRelations",
  id: "069c0e55-cd2f-49b1-ab91-2614dc1618c6",
  name: {
    en: "Влада і суспільні відносини",
  },
  skills: {
    earlyStateFormation: earlyStateFormation_Skill_Data,
    slaveryAndOtherDependencies: slaveryAndOtherDependencies_Skill_Data,
    socialHierarchies: socialHierarchies_Skill_Data,
    womenInAncientSocieties: womenInAncientSocieties_Skill_Data,
  },
  description: {
    methodological: "Comparing institutions requires identifying their functions rather than equating unfamiliar ancient names with familiar ones.",
    frontend: {
      en: "Explore how ancient people organized power and social relationships.",
    },
  },
});
