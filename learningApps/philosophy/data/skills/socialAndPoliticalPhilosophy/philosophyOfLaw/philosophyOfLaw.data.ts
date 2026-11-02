import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeLegalPositivism_Skill_Data, analyzeNaturalLawTheory_Skill_Data, analyzeTheRuleOfLaw_Skill_Data, evaluateTheoriesOfLegalInterpretation_Skill_Data } from './skills';

export const philosophyOfLaw_SkillGroup_Data = buildSkillGroupConfig({
  slug: "philosophyOfLaw",
  id: "65eb7d82-e6c3-49ed-8af0-60b055994e0b",
  name: {
    en: "Philosophy of Law",
  },
  skills: {
    analyzeLegalPositivism: analyzeLegalPositivism_Skill_Data,
    analyzeNaturalLawTheory: analyzeNaturalLawTheory_Skill_Data,
    analyzeTheRuleOfLaw: analyzeTheRuleOfLaw_Skill_Data,
    evaluateTheoriesOfLegalInterpretation: evaluateTheoriesOfLegalInterpretation_Skill_Data,
  },
  description: {
    methodological: "Jurisprudence considers what makes a norm legally valid, why legal institutions claim authority, and how rules should be interpreted. These questions are not limited to any country's current statutes or to political legitimacy in general.",
    frontend: {
      en: "Explore what makes legal rules authoritative and how they should be interpreted.",
    },
  },
});
