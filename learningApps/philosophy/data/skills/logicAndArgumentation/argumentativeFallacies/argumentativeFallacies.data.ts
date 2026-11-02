import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { detectAFalseDilemma_Skill_Data, detectAnAdHominemFallacy_Skill_Data, detectAnEquivocationFallacy_Skill_Data, detectAStrawManArgument_Skill_Data, detectCircularReasoning_Skill_Data, evaluateAnAppealToAuthority_Skill_Data } from './skills';

export const argumentativeFallacies_SkillGroup_Data = buildSkillGroupConfig({
  slug: "argumentativeFallacies",
  id: "fab984e1-fc83-4e0e-ae20-40e76d708fb3",
  name: {
    en: "Argumentative Fallacies",
  },
  skills: {
    detectAFalseDilemma: detectAFalseDilemma_Skill_Data,
    detectAnAdHominemFallacy: detectAnAdHominemFallacy_Skill_Data,
    detectAnEquivocationFallacy: detectAnEquivocationFallacy_Skill_Data,
    detectAStrawManArgument: detectAStrawManArgument_Skill_Data,
    detectCircularReasoning: detectCircularReasoning_Skill_Data,
    evaluateAnAppealToAuthority: evaluateAnAppealToAuthority_Skill_Data,
  },
  description: {
    methodological: "A flaw concerns the relation between claims and reasons, not necessarily the speaker's motives or a named cognitive bias. Context matters: surface wording alone rarely proves fallaciousness.",
    frontend: {
      en: "Learn to recognize common flaws in the support offered for claims.",
    },
  },
});
