import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assessProportionalityInMoralDecisions_Skill_Data, evaluateAMoralCounterargument_Skill_Data, identifyConflictingMoralObligations_Skill_Data, identifyStakeholdersInAnEthicalDilemma_Skill_Data, justifyAMoralJudgment_Skill_Data } from './skills';

export const moralDeliberation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "moralDeliberation",
  id: "07cfce9b-855e-48cb-92a9-da2cc4e48ca2",
  name: {
    en: "Moral Deliberation",
  },
  skills: {
    assessProportionalityInMoralDecisions: assessProportionalityInMoralDecisions_Skill_Data,
    evaluateAMoralCounterargument: evaluateAMoralCounterargument_Skill_Data,
    identifyConflictingMoralObligations: identifyConflictingMoralObligations_Skill_Data,
    identifyStakeholdersInAnEthicalDilemma: identifyStakeholdersInAnEthicalDilemma_Skill_Data,
    justifyAMoralJudgment: justifyAMoralJudgment_Skill_Data,
  },
  description: {
    methodological: "Difficult cases require identifying who is affected, which reasons conflict, and whether an apparent compromise respects relevant obligations.",
    frontend: {
      en: "Learn to reason through difficult choices with competing ethical considerations.",
    },
  },
});
