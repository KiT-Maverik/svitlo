import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { attentionalCapture_Skill_Data, dividedAttention_Skill_Data, inattentionalBlindness_Skill_Data, selectiveAttention_Skill_Data, sustainedAttention_Skill_Data } from './skills';

export const attentionAllocation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "attentionAllocation",
  id: "48a9aac7-c689-4749-b81b-80db948d3ae8",
  name: {
    en: "Attention Allocation",
  },
  skills: {
    attentionalCapture: attentionalCapture_Skill_Data,
    dividedAttention: dividedAttention_Skill_Data,
    inattentionalBlindness: inattentionalBlindness_Skill_Data,
    selectiveAttention: selectiveAttention_Skill_Data,
    sustainedAttention: sustainedAttention_Skill_Data,
  },
  description: {
    methodological: "Competing demands determine which inputs or tasks are prioritized and when performance degrades.",
    frontend: {
      en: "Discover how attention prioritizes some information over competing demands.",
    },
  },
});
