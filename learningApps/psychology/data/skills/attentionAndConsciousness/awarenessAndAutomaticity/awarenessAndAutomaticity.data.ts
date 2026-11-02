import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { alteredStatesOfConsciousness_Skill_Data, effortfulAndAutomaticProcessing_Skill_Data, limitsOfIntrospection_Skill_Data, skillAutomaticity_Skill_Data } from './skills';

export const awarenessAndAutomaticity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "awarenessAndAutomaticity",
  id: "dfa867cf-ad2e-4620-a80a-47af9961798c",
  name: {
    en: "Awareness and Automaticity",
  },
  skills: {
    alteredStatesOfConsciousness: alteredStatesOfConsciousness_Skill_Data,
    effortfulAndAutomaticProcessing: effortfulAndAutomaticProcessing_Skill_Data,
    limitsOfIntrospection: limitsOfIntrospection_Skill_Data,
    skillAutomaticity: skillAutomaticity_Skill_Data,
  },
  description: {
    methodological: "Deliberate processing differs from practiced routines, and retrospective introspection is an imperfect account of causes.",
    frontend: {
      en: "Explore differences between deliberate effort and practiced automatic processes.",
    },
  },
});
