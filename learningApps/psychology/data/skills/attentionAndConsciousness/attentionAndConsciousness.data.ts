import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { attentionAllocation_SkillGroup_Data } from './attentionAllocation/attentionAllocation.data';
import { awarenessAndAutomaticity_SkillGroup_Data } from './awarenessAndAutomaticity/awarenessAndAutomaticity.data';
import { sleepAndDailyRhythms_SkillGroup_Data } from './sleepAndDailyRhythms/sleepAndDailyRhythms.data';

export const attentionAndConsciousness_SkillDomain_Data = buildSkillDomainConfig({
  slug: "attentionAndConsciousness",
  id: "1e13a491-7d19-4972-a19d-d7d1aa0a43d7",
  name: {
    en: "Attention and Consciousness",
  },
  groups: {
    attentionAllocation: attentionAllocation_SkillGroup_Data,
    awarenessAndAutomaticity: awarenessAndAutomaticity_SkillGroup_Data,
    sleepAndDailyRhythms: sleepAndDailyRhythms_SkillGroup_Data,
  },
  description: {
    methodological: "Not all available information receives equal processing or enters reportable awareness. Focus, automaticity, waking states, and sleep have related but distinct psychological mechanisms.",
    frontend: {
      en: "Explore how attention, awareness and sleep affect mental processing.",
    },
  },
});
