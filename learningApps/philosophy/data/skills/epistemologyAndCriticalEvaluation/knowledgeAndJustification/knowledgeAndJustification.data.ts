import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeMathematicalProofAsJustification_Skill_Data, compareAPrioriAndEmpiricalJustification_Skill_Data, distinguishBeliefFromKnowledge_Skill_Data, distinguishTruthFromJustification_Skill_Data, evaluateReasonsForABelief_Skill_Data } from './skills';

export const knowledgeAndJustification_SkillGroup_Data = buildSkillGroupConfig({
  slug: "knowledgeAndJustification",
  id: "4f98fb29-5b82-4274-96bc-1482c64fd6fb",
  name: {
    en: "Knowledge and Justification",
  },
  skills: {
    analyzeMathematicalProofAsJustification: analyzeMathematicalProofAsJustification_Skill_Data,
    compareAPrioriAndEmpiricalJustification: compareAPrioriAndEmpiricalJustification_Skill_Data,
    distinguishBeliefFromKnowledge: distinguishBeliefFromKnowledge_Skill_Data,
    distinguishTruthFromJustification: distinguishTruthFromJustification_Skill_Data,
    evaluateReasonsForABelief: evaluateReasonsForABelief_Skill_Data,
  },
  description: {
    methodological: "Belief, truth, evidence, and knowledge have distinct roles in epistemic evaluation. Competing theories of knowledge can disagree about exactly how those roles connect.",
    frontend: {
      en: "Discover how belief, truth, evidence and knowledge relate but differ.",
    },
  },
});
