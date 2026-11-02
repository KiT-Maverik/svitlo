import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adolescentRiskTaking_Skill_Data, autonomyDevelopment_Skill_Data, identityExploration_Skill_Data, peerInfluenceInAdolescence_Skill_Data } from './skills';

export const adolescenceAndIdentity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "adolescenceAndIdentity",
  id: "bd3daaec-35d9-4b78-83ea-d98ab4166494",
  name: {
    en: "Adolescence and Identity",
  },
  skills: {
    adolescentRiskTaking: adolescentRiskTaking_Skill_Data,
    autonomyDevelopment: autonomyDevelopment_Skill_Data,
    identityExploration: identityExploration_Skill_Data,
    peerInfluenceInAdolescence: peerInfluenceInAdolescence_Skill_Data,
  },
  description: {
    methodological: "Developing autonomy, identity, peer relationships, and cognitive control interact with social expectations and opportunities.",
    frontend: {
      en: "Explore changes in identity, relationships and autonomy during adolescence.",
    },
  },
});
