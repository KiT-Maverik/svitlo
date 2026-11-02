import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bridgeConstructionApproaches_Skill_Data, pavementLayers_Skill_Data, planConstructionStages_Skill_Data, tunnelConstructionConstraints_Skill_Data } from './skills';

export const civilWorks_SkillGroup_Data = buildSkillGroupConfig({
  slug: "civilWorks",
  id: "e4b57c5b-354d-443a-8205-3f3673b29a4a",
  name: {
    en: "Civil Works",
  },
  skills: {
    bridgeConstructionApproaches: bridgeConstructionApproaches_Skill_Data,
    pavementLayers: pavementLayers_Skill_Data,
    planConstructionStages: planConstructionStages_Skill_Data,
    tunnelConstructionConstraints: tunnelConstructionConstraints_Skill_Data,
  },
  description: {
    methodological: "Large built assets require sequential construction and coordination with the ground and existing infrastructure.",
    frontend: {
      en: "Discover how engineers plan major construction projects.",
    },
  },
});
