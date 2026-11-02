import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeControlResponse_Skill_Data, controlArchitectureTradeOffs_Skill_Data, feedbackControlLoops_Skill_Data, openLoopControl_Skill_Data, safeControlFallback_Skill_Data } from './skills';

export const feedbackAndControl_SkillGroup_Data = buildSkillGroupConfig({
  slug: "feedbackAndControl",
  id: "28ec73c0-7da7-4e04-b15d-9916a293cda1",
  name: {
    en: "Feedback and Control",
  },
  skills: {
    analyzeControlResponse: analyzeControlResponse_Skill_Data,
    controlArchitectureTradeOffs: controlArchitectureTradeOffs_Skill_Data,
    feedbackControlLoops: feedbackControlLoops_Skill_Data,
    openLoopControl: openLoopControl_Skill_Data,
    safeControlFallback: safeControlFallback_Skill_Data,
  },
  description: {
    methodological: "A controlled process needs commands, observations and actuation; feedback can improve regulation but also create delay or oscillation.",
    frontend: {
      en: "Explore systems that use feedback to regulate physical processes.",
    },
  },
});
