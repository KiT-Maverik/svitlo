import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAestheticPluralism_Skill_Data, distinguishTasteFromAnArguedEvaluation_Skill_Data, evaluateTheRoleOfExpertiseInAestheticJudgment_Skill_Data } from './skills';

export const valueAndTaste_SkillGroup_Data = buildSkillGroupConfig({
  slug: "valueAndTaste",
  id: "f37fec73-0047-40e7-af2e-ec18c33a3a93",
  name: {
    en: "Value and Taste",
  },
  skills: {
    analyzeAestheticPluralism: analyzeAestheticPluralism_Skill_Data,
    distinguishTasteFromAnArguedEvaluation: distinguishTasteFromAnArguedEvaluation_Skill_Data,
    evaluateTheRoleOfExpertiseInAestheticJudgment: evaluateTheRoleOfExpertiseInAestheticJudgment_Skill_Data,
  },
  description: {
    methodological: "Debates about taste raise questions about expertise, social convention, and the relation of appreciation to human flourishing.",
    frontend: {
      en: "Explore how personal taste, expertise and cultural traditions influence appreciation.",
    },
  },
});
