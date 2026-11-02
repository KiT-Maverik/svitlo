import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeProceduralFairness_Skill_Data, compareDistributivePrinciples_Skill_Data, distinguishEqualityFromEquity_Skill_Data, evaluateAClaimAboutDiscrimination_Skill_Data } from './skills';

export const justiceAndEquality_SkillGroup_Data = buildSkillGroupConfig({
  slug: "justiceAndEquality",
  id: "8c4b6686-1f29-4c7e-a291-3562b147fc87",
  name: {
    en: "Justice and Equality",
  },
  skills: {
    analyzeProceduralFairness: analyzeProceduralFairness_Skill_Data,
    compareDistributivePrinciples: compareDistributivePrinciples_Skill_Data,
    distinguishEqualityFromEquity: distinguishEqualityFromEquity_Skill_Data,
    evaluateAClaimAboutDiscrimination: evaluateAClaimAboutDiscrimination_Skill_Data,
  },
  description: {
    methodological: "Claims of fairness depend on what is distributed, who qualifies for consideration, and which differences are morally relevant.",
    frontend: {
      en: "Explore how different concepts of fairness shape social arrangements.",
    },
  },
});
