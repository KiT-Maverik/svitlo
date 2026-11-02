import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAPhilosophicalArgumentFromAChineseTradition_Skill_Data, analyzeAPhilosophicalArgumentFromALatinAmericanTradition_Skill_Data, analyzeAPhilosophicalArgumentFromAnAfricanTradition_Skill_Data, analyzeAPhilosophicalArgumentFromAnIndianTradition_Skill_Data, analyzeAPhilosophicalArgumentFromAnIndigenousTradition_Skill_Data, analyzeAPhilosophicalArgumentFromAnIslamicTradition_Skill_Data, compareClassicalGreekPhilosophicalApproaches_Skill_Data, comparePositionsAcrossPhilosophicalTraditions_Skill_Data } from './skills';

export const philosophicalTraditions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "philosophicalTraditions",
  id: "dedb2815-31f3-46c8-804b-9ebe83a7197e",
  name: {
    en: "Philosophical Traditions",
  },
  skills: {
    analyzeAPhilosophicalArgumentFromAChineseTradition: analyzeAPhilosophicalArgumentFromAChineseTradition_Skill_Data,
    analyzeAPhilosophicalArgumentFromALatinAmericanTradition: analyzeAPhilosophicalArgumentFromALatinAmericanTradition_Skill_Data,
    analyzeAPhilosophicalArgumentFromAnAfricanTradition: analyzeAPhilosophicalArgumentFromAnAfricanTradition_Skill_Data,
    analyzeAPhilosophicalArgumentFromAnIndianTradition: analyzeAPhilosophicalArgumentFromAnIndianTradition_Skill_Data,
    analyzeAPhilosophicalArgumentFromAnIndigenousTradition: analyzeAPhilosophicalArgumentFromAnIndigenousTradition_Skill_Data,
    analyzeAPhilosophicalArgumentFromAnIslamicTradition: analyzeAPhilosophicalArgumentFromAnIslamicTradition_Skill_Data,
    compareClassicalGreekPhilosophicalApproaches: compareClassicalGreekPhilosophicalApproaches_Skill_Data,
    comparePositionsAcrossPhilosophicalTraditions: comparePositionsAcrossPhilosophicalTraditions_Skill_Data,
  },
  description: {
    methodological: "Intellectual traditions developed across many cultures through original arguments and sustained exchanges. Greek, Indian, Chinese, Islamic, African, Latin American, and particular Indigenous lineages are examined as philosophical sources in their own right, without treating a region as a single doctrine.",
    frontend: {
      en: "Examine philosophical arguments developed in many distinct cultural traditions.",
    },
  },
});
