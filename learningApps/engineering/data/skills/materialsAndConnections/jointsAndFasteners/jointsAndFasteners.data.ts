import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adhesiveJoints_Skill_Data, joiningMethodSuitability_Skill_Data, magneticFastening_Skill_Data, threadedFastening_Skill_Data, weldedJoints_Skill_Data } from './skills';

export const jointsAndFasteners_SkillGroup_Data = buildSkillGroupConfig({
  slug: "jointsAndFasteners",
  id: "9996ee09-eed9-4c91-afa3-f2d57596ecbf",
  name: {
    en: "Joints and Fasteners",
  },
  skills: {
    adhesiveJoints: adhesiveJoints_Skill_Data,
    joiningMethodSuitability: joiningMethodSuitability_Skill_Data,
    magneticFastening: magneticFastening_Skill_Data,
    threadedFastening: threadedFastening_Skill_Data,
    weldedJoints: weldedJoints_Skill_Data,
  },
  description: {
    methodological: "Connections can be temporary or permanent, transmit different forces and impose different maintenance requirements.",
    frontend: {
      en: "Discover how different joints hold parts together and transfer loads.",
    },
  },
});
