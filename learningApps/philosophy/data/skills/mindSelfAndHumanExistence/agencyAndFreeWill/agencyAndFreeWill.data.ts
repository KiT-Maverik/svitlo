import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareCompatibilistAndIncompatibilistFreedom_Skill_Data, compareDeterminismAndIndeterminism_Skill_Data, distinguishAnActionFromAnEvent_Skill_Data, distinguishReasonsForActionFromCausesOfBehavior_Skill_Data, evaluateConditionsOfMoralResponsibility_Skill_Data } from './skills';

export const agencyAndFreeWill_SkillGroup_Data = buildSkillGroupConfig({
  slug: "agencyAndFreeWill",
  id: "2b40a5b3-f6bc-4511-a487-03fa26289936",
  name: {
    en: "Agency and Free Will",
  },
  skills: {
    compareCompatibilistAndIncompatibilistFreedom: compareCompatibilistAndIncompatibilistFreedom_Skill_Data,
    compareDeterminismAndIndeterminism: compareDeterminismAndIndeterminism_Skill_Data,
    distinguishAnActionFromAnEvent: distinguishAnActionFromAnEvent_Skill_Data,
    distinguishReasonsForActionFromCausesOfBehavior: distinguishReasonsForActionFromCausesOfBehavior_Skill_Data,
    evaluateConditionsOfMoralResponsibility: evaluateConditionsOfMoralResponsibility_Skill_Data,
  },
  description: {
    methodological: "Acting for reasons, selecting among alternatives, and being accountable are connected but separable philosophical ideas.",
    frontend: {
      en: "Explore how choice, reasons and responsibility relate to freedom.",
    },
  },
});
