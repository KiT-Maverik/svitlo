import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { applyCareEthicalReasoning_Skill_Data, applyConsequentialistReasoning_Skill_Data, applyDutyBasedReasoning_Skill_Data, applyVirtueEthicalReasoning_Skill_Data, compareEthicalFrameworksOnOneDilemma_Skill_Data } from './skills';

export const ethicalFrameworks_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ethicalFrameworks",
  id: "c448fa9c-69b6-4266-a224-5a116dfd9a6f",
  name: {
    en: "Ethical Frameworks",
  },
  skills: {
    applyCareEthicalReasoning: applyCareEthicalReasoning_Skill_Data,
    applyConsequentialistReasoning: applyConsequentialistReasoning_Skill_Data,
    applyDutyBasedReasoning: applyDutyBasedReasoning_Skill_Data,
    applyVirtueEthicalReasoning: applyVirtueEthicalReasoning_Skill_Data,
    compareEthicalFrameworksOnOneDilemma: compareEthicalFrameworksOnOneDilemma_Skill_Data,
  },
  description: {
    methodological: "Normative theories emphasize different criteria of moral assessment. A theory is not a universal formula that automatically resolves every difficult case.",
    frontend: {
      en: "Compare major theories for evaluating right and wrong actions.",
    },
  },
});
