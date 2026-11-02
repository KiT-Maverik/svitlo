import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { elaborativeEncoding_Skill_Data, memoryConsolidation_Skill_Data, organizationAndChunking_Skill_Data, spacingEffects_Skill_Data } from './skills';

export const encodingAndConsolidation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "encodingAndConsolidation",
  id: "3c2d8ef5-979a-4ffb-8c64-b284739179e3",
  name: {
    en: "Encoding and Consolidation",
  },
  skills: {
    elaborativeEncoding: elaborativeEncoding_Skill_Data,
    memoryConsolidation: memoryConsolidation_Skill_Data,
    organizationAndChunking: organizationAndChunking_Skill_Data,
    spacingEffects: spacingEffects_Skill_Data,
  },
  description: {
    methodological: "Attention, meaningful structure, and subsequent processing influence what can later be remembered.",
    frontend: {
      en: "Discover processes that help new information enter and stabilize in memory.",
    },
  },
});
