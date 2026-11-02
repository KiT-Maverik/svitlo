import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bystanderEffect_Skill_Data, groupPolarization_Skill_Data, groupthink_Skill_Data, inGroupAndOutGroupBias_Skill_Data, socialIdentity_Skill_Data } from './skills';

export const groupDynamics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "groupDynamics",
  id: "dba1c136-fe98-4ef4-be7c-e632c64496c8",
  name: {
    en: "Group Dynamics",
  },
  skills: {
    bystanderEffect: bystanderEffect_Skill_Data,
    groupPolarization: groupPolarization_Skill_Data,
    groupthink: groupthink_Skill_Data,
    inGroupAndOutGroupBias: inGroupAndOutGroupBias_Skill_Data,
    socialIdentity: socialIdentity_Skill_Data,
  },
  description: {
    methodological: "Belonging and coordination can alter performance, responsibility, intergroup attitudes, and collective decisions.",
    frontend: {
      en: "Explore how group identities and discussions shape behavior.",
    },
  },
});
